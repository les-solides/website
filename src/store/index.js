import Vue from 'vue';
import Vuex from 'vuex';
import shopify from "./shop/shopify";
import Client from "shopify-buy/index.unoptimized.umd";
import Footer from "../modules/Footer";

const storefront = Client.buildClient({
	domain: 'lessolides.myshopify.com',
	language: 'en-us', // todo: set current language (reload on switch)
	storefrontAccessToken: '18f459035d1887fdb5354ec29a9cf028'
});

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		bagIsOpen: false,
		breakpoints: {
			'sm': 640,
			// => @media (min-width: 640px) { ... }
			'md': 1024,
			// => @media (min-width: 768px) { ... }
			'lg': 1024,
			// => @media (min-width: 1024px) { ... }
			'xl': 1280,
			// => @media (min-width: 1280px) { ... }
		},
		collaborationHash: undefined,
		collaborationIndices: [],
		footerIsOpen: false,
		footerRoute: null,
		isMobile: false,
		loading: false,
		loadingTimeout: null,
		menuOpen: false,
		routeClick: true,
		storefront: storefront,
	},
	getters: {
		bagIsOpen(state) {
			return !! state.bagIsOpen;
		},
		footerIsOpen(state) {
			return !! state.footerIsOpen;
		},
		footerRoute(state) {
			return state.footerRoute;
		},
		isMobile(state) {
			return state.isMobile;
		},
		loading(state) {
			return !! state.loading;
		},
		menuOpen(state) {
			return !! state.menuOpen;
		}
	},
	mutations: {
		refreshIsMobile(state) {
			state.isMobile = state.breakpoints.md >= window.innerWidth;
		},
		updateBagOpen(state, value) {
			state.bagIsOpen = !! value;
		},
		updateFooterOpen(state, value) {
			state.footerIsOpen = !! value;
		},
		updateFooterRoute(state, value) {
			const exists = Object
				.values(Footer.routes)
				.find(v => v === value);
			if (exists) {
				state.footerRoute = value;
			}
		},
		updateLoading(state, value) {
			clearTimeout(state.loadingTimeout);
			if ( ! value) {
				return state.loadingTimeout = setTimeout(() =>
					state.loading = false, 1000
				);
			}
			state.loading = value;
		},
		updateMenuOpen(state, value) {
			state.menuOpen = !! value;
		}
	},
	actions: {
	
	},
	modules: {
		shopify
	}
});
