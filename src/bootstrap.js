require('intersection-observer');

import Vue from 'vue';
import Cart from "./modules/shopify/Cart";
import store from './store/index';
import Toasted from 'vue-toasted';

Vue.use(Toasted);

export default async () => {
	let checkout = await store.dispatch('shopify/synchroniseCheckout');
	Vue.prototype.$cart = new Cart(checkout.id);
	Vue.prototype._ = require('lodash');
	Vue.prototype.o = (object) => { return object || {} };
};
