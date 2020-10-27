import Product from "../../../modules/shopify/Product";
import ProductField from "../../../modules/shopify/fields/ProductField";
import api from "../../../api/shopifyAPI";
import productByHandle from "./queries/productByHandle";
import Utils from "../../../modules/Utils";
import productRecommendations from "./queries/productRecommendations";
import productsByQuery from "./queries/productsByQuery";
import productsByHandles from "./queries/productsByHandles";
import productsSchema from "./queries/productsSchema";

export default {
	namespaced: true,
	state: {
		cursor: null,
		hasNextPage: false,
		pagination: 1,
		products: [],
		selectedProduct: null
	},
	actions: {
		async fetchAll({commit}, first = 250) {
			return api
				.post("", productsSchema(first))
				.then(({data}) => {
					const products = data.data.products.edges.map(e =>
						new Product(e.node)
					);
					commit('addProducts', products);
					return products;
				});
		},
		async fetchByHandle(state, handle) {
			return api.post("", productByHandle(handle))
					  .then(data => {
						  const product = Utils.getNested(data,
							  "data", "data", "productByHandle");
						  return product ? new Product(product) : null;
					  });
		},
		async fetchRecommendations({getters, dispatch, rootState}, id) {
			const query = rootState.storefront.graphQLClient
								   .query(root => {
									   root.add("productRecommendations",
										   {args: {productId: id}},
										   recommendations => {
											   ProductField.addTo(recommendations);
										   });
								   });
			let recommendations = await rootState.storefront.graphQLClient
												 .send(query)
												 .then(({data}) => data
													 .productRecommendations
													 .slice(0, 5)
													 .map(r => new Product(r))
												 );
			if (recommendations.length < 5) { // fill until 5 items
				// let more = await dispatch("fetchAll", 8);
				let more = [...getters['allProducts']]
					.sort(() => Math.random() - Math.random())
					.slice(0, 8);
				for (let product of more) {
					if (recommendations.find(r => r.id === product.id)) {
						continue;
					}
					if (recommendations.length >= 5) {
						break;
					}
					recommendations.push(product);
				}
			}
			return recommendations;
		},
		async paginate({commit, rootState, state}, searchQuery = "") {
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
							.then(async ({data}) => {
								state.hasNextPage = data.products.pageInfo.hasNextPage;
								const products = data.products.edges.map(e => {
									state.cursor = e.cursor;
									return new Product(e.node);
								});
								await commit('addProducts', products);
								return products;
							});
		},
		async search({rootState}, searchQuery) {
			return api.post("", productsByQuery(searchQuery))
					  .then(({data}) => data.data.products.edges.map(e => new Product(e.node)));
		},
		async searchByHandles({rootState}, handles) {
			return api.post("", productsByHandles(handles))
					  .then(({data}) => data.data.products.edges.map(e => new Product(e.node)));
		}
	},
	getters: {
		allAddOns(state) {
			return state.products.filter(product =>
				!! product.images.find(image =>
					/.*add-on:*/.test(image.alt)
				)
			);
		},
		allAddOnsByProduct: (_, getters) => product => {
			return getters['allAddOns'].filter(addOn =>
				addOn.images.find(image =>
					image.alt.includes(product.handle)
				)
			);
		},
		allProducts(state) {
			return state.products || [];
		},
		allProductsByAddOn: (_, getters) => addOn => {
			return getters['allProducts'].filter(product =>
				addOn.images.find(image =>
					image.alt.includes(`add-on:${ product.handle }`)
				)
			);
		},
		selectedProduct(state) {
			return state.selectedProduct || null;
		}
	},
	mutations: {
		/**
		 * Pushes items of product array to the inventory.
		 *
		 * @param {Array<Product>} products
		 * @param {Object} state
		 */
		addProducts(state, products) {
			if ( ! Array.isArray(products)) {
				throw new TypeError('[store/shopify] products must be an array.');
			}
			products.forEach(product => {
				product = product instanceof Product ? product : new Product(product);
				state.products = state.products.filter(p => p.id !== product.id);
				state.products.push(product);
			});
		},
		updateSelectedProduct(state, product) {
			state.selectedProduct = null;
			state.selectedProduct = product instanceof Product ? product : null;
		}
	}
};
