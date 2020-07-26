<template>
	<div id="app">
		<TheHeader v-if=" ! noHeader" />
		
		<TheBody>
			<router-view />
		</TheBody>
		
		<TheFooter v-if=" ! noFooter" />
	</div>
</template>
<script>
	import TheHeader from "./components/layout/TheHeader";
	import TheFooter from "./components/layout/TheFooter";
	import TheBody from "./components/layout/TheBody";
	import { debounce } from 'lodash';
	
	export default {
		components: { TheBody, TheFooter, TheHeader },
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
		},
		destroyed() {
			window.removeEventListener('resize', this.handleResize);
		}
	};
</script>