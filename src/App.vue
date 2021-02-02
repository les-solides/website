<template>
	<div id="app"
		 class="transition-opacity-0">
		<TheHeader v-if=" ! noHeader" />
		
		<TheBody>
			<transition name="fade">
				<router-view />
			</transition>
		</TheBody>
		
		
		<transition name="fade">
			<ProductDetail
					class="fixed"
					:product="selectedProduct"
					v-if="selectedProduct" />
		</transition>
		
		<transition name="fade">
			<TheGifLoadingScreen v-if="loading" />
		</transition>
		
		<CookieNotice button-content="accept-cookies">
			We use cookies to improve user experience, and analyze website traffic.
			For these reasons, we may share your site usage data with our analytics partners.
			By clicking “accept cookies” you consent to store on your device all the technologies described in our
			cookie policy.
		</CookieNotice>
		
		<TheFooter class="hidden md:block"
				   v-if=" ! noFooter" />
	</div>
</template>
<script>
	import TheHeader from "./components/layout/TheHeader";
	import TheFooter from "./components/layout/TheFooter";
	import TheBody from "./components/layout/TheBody";
	import CookieNotice from "./components/partials/CookieNotice";
	import { mapGetters } from "vuex";
	import TheGifLoadingScreen from "./components/layout/TheGifLoadingScreen";
	import ProductDetail from "./components/shop/partials/ProductDetail";
	import { debounce } from "lodash";
	
	export default {
		components: {ProductDetail, TheGifLoadingScreen, CookieNotice, TheBody, TheFooter, TheHeader},
		data: () => ({
			ready: false
		}),
		computed: {
			...mapGetters(['loading']),
			noFooter() {
				return this.$route.meta.noFooter;
			},
			noHeader() {
				return this.$route.meta.noHeader;
			},
			selectedProduct() {
				return this.$store.getters['shopify/product/selectedProduct'];
			}
		},
		methods: {
			handleResize() {
				this.$store.commit('refreshIsMobile');
				document.documentElement.style.setProperty('--column-width-default',
					`${ window.innerWidth * 0.38 }px`
				);
				document.documentElement.style.setProperty('--column-width-3',
					`${ window.innerWidth * 0.18 }px`
				);
			},
			async removeInitialLoadingScreen() {
				const app = document.querySelector('#app');
				const loader = document.querySelector('#initial-load');
				if ( ! loader) {
					return;
				}
				loader.innerHTML = "loading (100%)";
				loader.style.opacity = 0;
				await this.wait(500);
				loader.remove();
				app.style.opacity = 1;
			}
		},
		metaInfo: {
			title: 'home',
			titleTemplate: '%s | les solides'
		},
		mounted() {
			window.addEventListener('resize', debounce(this.handleResize, 100));
			this.handleResize();
			this.removeInitialLoadingScreen();
		},
		destroyed() {
			window.removeEventListener('resize', this.handleResize);
		}
	};
</script>