<template>
	<div id="app"
		 v-if="ready">
		<TheHeader v-if=" ! noHeader" />
		
		<TheBody>
			<router-view />
		</TheBody>
		
		<CookieNotice button-content="accept-cookies">
			We use cookies to improve user experience, and analyze website traffic.
			For these reasons, we may share your site usage data with our analytics partners.
			By clicking “accept cookies” you consent to store on your device all the technologies described in our cookie policy.
		</CookieNotice>
		
		<TheFooter v-if=" ! noFooter" />
	</div>
</template>
<script>
	import TheHeader from "./components/layout/TheHeader";
	import TheFooter from "./components/layout/TheFooter";
	import TheBody from "./components/layout/TheBody";
	import { debounce, delay } from 'lodash';
	import CookieNotice from "./components/partials/CookieNotice";
	
	export default {
		components: {CookieNotice, TheBody, TheFooter, TheHeader},
		data: () => ({
			ready: false
		}),
		computed: {
			noFooter() {
				return this.$route.meta.noFooter;
			},
			noHeader() {
				return this.$route.meta.noHeader;
			}
		},
		methods: {
			handleResize() {
				this.$store.commit('refreshIsMobile');
			}
		},
		mounted() {
			window.addEventListener('resize', debounce(this.handleResize, 100));
			this.handleResize();
			delay(() => this.ready = true, 500);
		},
		destroyed() {
			window.removeEventListener('resize', this.handleResize);
		}
	};
</script>