import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../store/index';
import { delay } from "lodash";

Vue.use(VueRouter);

const maintenanceRoute = [{
	path: '*',
	name: 'Maintenance',
	meta: {
		noFooter: true,
		noHeader: true
	},
	component: () => import(/* webpackChunkName: "Home" */ '../views/Maintenance')
}];

const routes = [
	{
		path: '',
		name: 'Landing',
		meta: {
			noFooter: true,
			noHeader: true
		},
		component: () => import(/* webpackChunkName: "Home" */ '../views/Landing')
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import(/* webpackChunkName: "Home" */ '../views/Home')
	},
	{
		path: '/archive',
		name: 'Archive',
		component: () => import(/* webpackChunkName: "Product" */ '../views/Archive')
	},
	{
		path: '/collaborations',
		name: 'Collaborations',
		component: () => import(/* webpackChunkName: "Product" */ '../views/Collaborations')
	},
	{
		path: '/lookbook',
		name: 'Lookbook',
		component: () => import(/* webpackChunkName: "Product" */ '../views/Lookbook')
	},
	{
		path: '/products',
		name: 'Products (Main)',
		meta: {
			navigationArticle: "Navigation (Products)"
		},
		component: () => import(/* webpackChunkName: "Product" */ '../views/Products')
	},
	{
		path: '/products/:collection',
		name: 'Products (Collection)',
		meta: {
			navigationArticle: "Navigation (Products)"
		},
		component: () => import(/* webpackChunkName: "Product" */ '../views/Products')
	},
	{
		path: '/products/:collection/:filter',
		name: 'Products (Filter)',
		meta: {
			navigationArticle: "Navigation (Products)"
		},
		component: () => import(/* webpackChunkName: "Product" */ '../views/Products')
	},
	{
		path: '/product/:handle',
		name: 'Product',
		component: () => import(/* webpackChunkName: "Product" */ '../components/shop/Product')
	},
	{
		path: '/search',
		name: 'Search',
		component: () => import(/* webpackChunkName: "Search" */ '../views/Search')
	},
	{
		path: '*',
		name: 'PageNotFound404',
		component: () => import(/* webpackChunkName: "404 Page Not Found"*/'./../views/errors/PageNotFound404')
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: process.env.VUE_APP_MAINTENANCE === "true" ? maintenanceRoute : routes,
	scrollBehavior (to) {
		if (to.hash) {
			return {
				offset: {
					x: 0,
					y: 120
				},
				selector: to.hash
			}
		}
	}
});

router.beforeEach((to, from, next) => {
	store.state.routeClick = true;
	store.commit('updateMenuOpen', false);
	next();
});

router.afterEach((to) => {
	store.state.collaborationHash = to.hash.slice(1);
	delay(() => store.state.routeClick = false, 100);
});

export default router;
