<template>
	<div class="footer-page w-1/4">
		<h3>{{ title }}</h3>
		<div class="md:column-1" v-html="content"></div>
		<Error v-if="loaded && error" />
	</div>
</template>

<script>
	import Error from "../../components/partials/Error";
	export default {
		name: "Stockist",
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
				'page:stockist'
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