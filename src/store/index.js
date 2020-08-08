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
		breakpoints: {
			'sm': 640,
			// => @media (min-width: 640px) { ... }
			'md': 768,
			// => @media (min-width: 768px) { ... }
			'lg': 1024,
			// => @media (min-width: 1024px) { ... }
			'xl': 1280,
			// => @media (min-width: 1280px) { ... }
		},
		collaborationHash: undefined,
		isMobile: false,
		routeClick: true,
		storefront: storefront,
	},
	getters: {
		isMobile(state) {
			return state.isMobile;
		}
	},
	mutations: {
		refreshIsMobile(state) {
			state.isMobile = state.breakpoints.md >= window.innerWidth;
		}
	},
	actions: {
	
	},
	modules: {
		shopify
	}
});
