<template>
	<div class="font-lg w-full">
		<div v-html="content"></div>
		<Error v-if="loaded && error" />
	</div>
</template>

<script>
	import Error from "../../components/partials/Error";
	
	export default {
		name: "About",
		components: {Error},
		props: {
			page: String
		},
		data: () => ({
			content: null,
			error: false,
			loaded: false,
			title: null
		}),
		methods: {
			async load() {
				const result = await this.$store.dispatch(
					'shopify/blog/fetchFirstArticleByTags',
					this.page
				);
				
				this.loaded = true;
				
				if ( ! result) {
					return this.error = true;
				}
				
				this.content = result.contentHtml;
				this.title = result.title;
			}
		},
		async created() {
			await this.load();
		},
		watch: {
			page() {
				this.load();
			}
		}
	};
</script>

<style scoped
	   lang="scss">
	@import "./../../scss/partials/variables";
	
	.md\:columnist-1 {
		@media screen and (min-width: $breakpoint-md) {
			width: var(--column-width-default);
		}
	}
</style>