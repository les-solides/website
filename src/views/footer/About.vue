<template>
	<div class="md:columnist-1">
		<div v-html="content"></div>
		<Error v-if="loaded && error" />
	</div>
</template>

<script>
	import Error from "../../components/partials/Error";
	
	export default {
		name: "About",
		components: {Error},
		data: () => ({
			content: null,
			error: false,
			loaded: false,
			title: null
		}),
		async created() {
			const result = await this.$store.dispatch(
				'shopify/blog/fetchFirstArticleByTags',
				'page:about'
			);
			
			this.loaded = true;
			
			if ( ! result) {
				return this.error = true;
			}
			
			this.content = result.contentHtml;
			this.title = result.title;
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