import CollectionField from "../../../modules/shopify/fields/CollectionField";
import Collection from "../../../modules/shopify/Collection";

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

        },
        async fetchRecommendations({dispatch, rootState}, id) {

        }
    }
}
