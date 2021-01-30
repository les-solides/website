import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueFacebookPixel from 'vue-analytics-facebook-pixel';
import "./scss/main.scss";

Vue.use(VueFacebookPixel);

(async () => {
	
	await require('./bootstrap').default();
	
	Vue.config.devtools = process.env.NODE_ENV === 'development';
	
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
	
})();


