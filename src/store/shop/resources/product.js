import Product from "../../../modules/shopify/Product";
import ProductField from "../../../modules/shopify/fields/ProductField";
import api from "../../../api/api";
import productByHandle from "./queries/productByHandle";
import Utils from "../../../modules/Utils";

export default {
    namespaced: true,
    state: {
        cursor: null,
        hasNextPage: false,
        inventory: [],
        pagination: 1
    },
    actions: {
        async fetchAll(state, first = 250) {
            const query = state.rootState.storefront.graphQLClient.query(root => {
                root.addConnection("products", { args: { first } }, (product) => {
                    ProductField.addTo(product);
                });
            });
            return state.rootState.storefront.graphQLClient
                .send(query)
                .then(({ data }) =>
                    data.products.edges.map(e => new Product(e.node))
                );
        },
        async fetchByHandle(state, handle) {
            return api.post("", productByHandle(handle))
                      .then(data => {
                          const product = Utils.getNested(data,
                              "data", "data", "productByHandle")
                          return product ? new Product(product) : null
                      });
        },
        async fetchRecommendations({ dispatch, rootState }, id) {
            const query = rootState.storefront.graphQLClient
                .query(root => {
                    root.add("productRecommendations",
                        { args: { productId: id } },
                        recommendations => {
                            ProductField.addTo(recommendations);
                        });
                });
            let recommendations = await rootState.storefront.graphQLClient
                .send(query)
                .then(({ data }) => data
                    .productRecommendations
                    .slice(0, 6)
                    .map(r => new Product(r))
                );
            if (recommendations.length < 6) { // fill until 3 items
                let more = await dispatch("fetchAll", 8);
                for (let product of more) {
                    if (recommendations.find(r => r.id === product.id)) {
                        continue;
                    }
                    if (recommendations.length >= 6) {
                        break;
                    }
                    recommendations.push(product);
                }
            }
            return recommendations;
        },
        async paginate({ commit, rootState, state }, searchQuery = "") {
            const query = rootState.storefront.graphQLClient
                .query(root => {
                    root.addConnection(
                        "products",
                        {
                            args: {
                                after: state.cursor,
                                first: state.pagination,
                                query: searchQuery
                            }
                        },
                        (product) => {
                            ProductField.addTo(product);
                        }
                    );
                });
            return rootState.storefront.graphQLClient
                .send(query)
                .then(async ({ data }) => {
                    state.hasNextPage = data.products.pageInfo.hasNextPage;
                    const products = data.products.edges.map(e => {
                        state.cursor = e.cursor;
                        return new Product(e.node);
                    });
                    await commit('addManyToInventory', products);
                    return products;
                });
        },
        async search({ rootState }, searchQuery) {
            const query = rootState.storefront.graphQLClient
                .query(root => {
                    root.addConnection(
                        "products",
                        { args: { first: 250, query: searchQuery } },
                        (product) => {
                            ProductField.addTo(product);
                        }
                    );
                });
            return rootState.storefront.graphQLClient
                .send(query)
                .then(({ data }) =>
                    data.products.edges.map(e => new Product(e.node))
                );
        }
    },
    getters: {
        inventory(state) {
            return state.inventory || [];
        }
    },
    mutations: {
        /**
         * Pushes items of product array to the inventory.
         *
         * @param {Array<Product>} products
         * @param {Object} state
         */
        addManyToInventory(state, products = []) {
            if ( ! Array.isArray(products)) {
                throw new TypeError("Must be of type Array");
            }
            products.forEach(product => {
                if ( ! (product instanceof Product)) {
                    return;
                }

                const exists = state.inventory
                    .find(p => p.id === product.id);

                if ( ! exists) {
                    state.inventory.push(product);
                }
            });
        },
        addOneToInventory(state, product) {
            if ( ! (product instanceof Product)) {
                return;
            }

            const exists = state.inventory
                .find(p => p.id === product.id);

            if ( ! exists) {
                state.inventory.push(product);
            }
        },
        resetCursor(state) {
            state.cursor = null;
        }
    }
};
