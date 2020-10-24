require('intersection-observer');

import Vue from 'vue';
import Cart from "./modules/shopify/Cart";
import store from './store/index';
import Toasted from 'vue-toasted';
import VueSmoothScroll from 'vue2-smooth-scroll';
import VueFullPage from 'vue-fullpage.js';

import { delay } from "lodash";

Vue.use(VueFullPage);
Vue.use(Toasted);
Vue.use(VueSmoothScroll);

export default async () => {
	let checkout = await store.dispatch('shopify/synchroniseCheckout');
	await store.dispatch('shopify/product/fetchAll');
	
	Vue.prototype.$cart = new Cart(checkout.id);
	Vue.prototype._ = require('lodash');
	Vue.prototype.o = (object) => { return object || {} };
	Vue.prototype.wait = (milliseconds) => new Promise(resolve =>
		delay(() => resolve(resolve()), milliseconds));
};
