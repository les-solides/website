import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "./scss/main.scss";

(async () => {
	
	await require('./bootstrap').default();
	
	await store.dispatch('shopify/product/fetchAll');
	
	Vue.config.devtools = process.env.NODE_ENV === 'development';
	
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
	
})();


