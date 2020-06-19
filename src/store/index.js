import Vue from 'vue';
import Vuex from 'vuex';
import shopify from "./shop/shopify";
import Client from "shopify-buy/index.unoptimized.umd";

const storefront = Client.buildClient({
	domain: 'lessolides.myshopify.com',
	language: 'en-us', // todo: set current language (reload on switch)
	storefrontAccessToken: '18f459035d1887fdb5354ec29a9cf028'
});

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		storefront: storefront,
	},
	mutations: {},
	actions: {},
	modules: {
		shopify
	}
});
