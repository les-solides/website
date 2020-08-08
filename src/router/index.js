import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../store/index';
import { delay } from "lodash";

Vue.use(VueRouter);

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
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
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
	next();
});

router.afterEach((to) => {
	store.state.collaborationHash = to.hash.slice(1);
	delay(() => store.state.routeClick = false, 100);
});

export default router;
