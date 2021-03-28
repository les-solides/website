<template>
	<div class="ls-footer-page-content">
		<div v-html="content"></div>
		<Error v-if="loaded && error" />
	</div>
</template>

<script>
	import Error from "../../components/partials/Error";
	export default {
		name: "TermsOfUse",
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
				'page:terms-of-use'
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
	
	.md\:columnist-3 {
		@media screen and (min-width: $breakpoint-md) {
			columns: 3;
			column-width: var(--column-width-3);
		}
	}
</style>