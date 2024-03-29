import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMeta from 'vue-meta';
import VueFacebookPixel from 'vue-analytics-facebook-pixel';
import "./scss/main.scss";

Vue.use(VueFacebookPixel);
Vue.use(VueMeta);

(async () => {
	
	await require('./bootstrap')
		.default();
	
	Vue.analytics.fbq.init('689797371764862', {
		em: 'hello@lessolides.com'
	});
	
	Vue.config.devtools = process.env.NODE_ENV === 'development';
	
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
	
})();


