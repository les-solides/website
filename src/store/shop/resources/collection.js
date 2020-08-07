import CollectionField from "../../../modules/shopify/fields/CollectionField";
import Collection from "../../../modules/shopify/Collection";
import api from "../../../api/api";
import CollectionByHandleQuery from "./queries/CollectionByHandleQuery";
import Utils from "../../../modules/Utils";
import Product from "../../../modules/shopify/Product";

export default {
    namespaced: true,
    actions: {
        async fetchAll (state, first = 250) {
            const query = state.rootState.storefront.graphQLClient.query(root => {
                root.addConnection('collections', {args: {first}}, (collection) => {
                    CollectionField.addTo(collection);
                });
            });
            let collections = await state.rootState.storefront.graphQLClient
                .send(query)
                .then(({data}) =>
                    data.collections.edges
                        .map(e => new Collection(e.node))
                );
            collections.forEach(c =>
                c.addChildren(collections)
            );
            return collections;
            /*console.log({collections});
            collections.forEach(c =>
                c.setParentFromCollectionArray(collections)
            );
            return collections;*/
        },
        async fetchByHandle (state, handle) {
            return api.post("", CollectionByHandleQuery(handle))
                      .then(data => {
                          let products = Utils.getNested(data,
                              "data", "data", "collectionByHandle", "products", "edges");
                          if ( ! Array.isArray(products)) {
                              return [];
                          }
                          return products.map(product => new Product(product.node));
                      });
        },
        async fetchRecommendations({dispatch, rootState}, id) {

        }
    }
}
