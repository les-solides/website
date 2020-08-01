import Vue from 'vue';
import VueRouter from 'vue-router';

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
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
