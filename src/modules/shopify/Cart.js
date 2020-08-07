import store from "./../../store/index";
import LineItem from "./../shopify/LineItem";

export default class Cart {

    // @todo: remove sold out products on construct
    // @todo: handle synchronisation error (maybe 3 tries and then empty cart)
    // @todo: remove item after synchronisation if variant product id doesn't exist in synchronised product
    // @todo: include sold out prices when calculating total
    // @todo: adapt prices to Environment.isWholesale

    constructor (id) {
        this.id = id;
        window.onbeforeunload = () => {
            this.persist();
        };
    }

    get checkout() {
        return store.getters['shopify/checkout'];
    }

    get empty () {
        return ! this.checkout.lineItems.length;
    }

    get items () {
        return this.checkout
            .lineItems.map(i => new LineItem(i));
    }

    static key() {
        return "cart";
    }

    get length () {
        return this.items.length;
    }

    get total () {
        return this.checkout.totalPriceV2.amount;
    }

    get url() {
        return this.checkout.webUrl;
    }

    async add (variant) {
        return await store.dispatch(
            'shopify/addToCheckout',
            variant
        );
    }

    persist () {
        localStorage.setItem(Cart.key(), this.id);
    }

    async remove (item) {
        await store.dispatch('shopify/removeFromCheckout', item.id);
        return await store.dispatch('shopify/synchroniseCheckout');
    }

    reset () { /* todo:i */ }

    async synchronise () {
        return await store.dispatch(
            'shopify/synchroniseCheckout'
        );
    }

    async updateQuantity(item, quantity) {
        quantity = quantity > 0 ? quantity : 1;
        await store.dispatch('shopify/updateLineItem', {
            item,
            quantity
        });
        return await store.dispatch('shopify/synchroniseCheckout');
    }
}