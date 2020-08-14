import blog from "./resources/blog";
import collection from "./resources/collection";
import product from "./resources/product";
import Cart from "../../modules/shopify/Cart";

export default {
    namespaced: true,
    modules: {
        blog,
        collection,
        product
    },
    state: {
        checkout: null,
        products: []
    },
    getters: {
        checkout(state) {
            return state.checkout;
        }
    },
    actions: {
        async createCheckout({state, rootState}) {
            state.checkout = await rootState.storefront.checkout
                .create().then(checkout => checkout);
            return state.checkout;
        },
        async addToCheckout({state, dispatch, rootState}, {variant, quantity, attr}) {
            await dispatch("synchroniseCheckout");
            return await rootState.storefront.checkout
                .addLineItems(state.checkout.id, [{
                    variantId: variant.id,
                    quantity: Number(quantity),
                    customAttributes: attr || []
                }]).then(async () =>
                    await dispatch("synchroniseCheckout")
                ); // todo: error handling
        },
        async removeFromCheckout({state, rootState}, id) {
            return await rootState.storefront.checkout
                .removeLineItems(state.checkout.id,[
                    id
                ]);
        },
        async synchroniseCheckout({commit, dispatch, state, rootState}) {
            let checkout;
            const id = await localStorage.getItem(Cart.key());

            // if no checkout registered yet, create a new checkout one
            if ( ! state.checkout && ! id) {
                return await dispatch('createCheckout');
            }

            // if checkout exists in state, but not in local storage, then
            // fetch the checkout with the id from the state
            if ( ! id) {
                checkout = await rootState.storefront.checkout
                    .fetch(state.checkout.id)
                    .then(checkout => checkout);

                // if checkout already completed (order submitted),
                // then create a new checkout
                if ( ! checkout || checkout.completedAt) {
                    return await dispatch('createCheckout');
                }

                await commit('updateCheckout', checkout);
                return checkout;
            }
            
            // if checkout id is found in local storage,
            // then fetch checkout with that id
            checkout = await rootState.storefront.checkout
                .fetch(id)
                .then(checkout => checkout);

            // if checkout already completed (order submitted),
            // then create a new checkout
            if ( ! checkout || checkout.completedAt) {
                return await dispatch('createCheckout');
            }

            await commit('updateCheckout', checkout);
            return checkout;
        },
        async updateLineItem({dispatch, state, rootState}, {item, quantity}) {
            await dispatch('removeFromCheckout', item.id);
            return await dispatch('addToCheckout', {
                variant: item.variant,
                quantity
            });
        },
    },
    mutations: {
        async updateCheckout(state, checkout) {
            state.checkout = checkout;
        }
    }
};
