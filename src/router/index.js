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
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
