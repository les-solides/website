<template>
	<div v-if="article">
		<ContactForm :article="article" />
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import ContactForm from "../partials/ContactForm";
	
	export default {
		name: "Contact",
		components: {ContactForm},
		data: () => ({
			article: null,
			content: null,
			error: false,
			loaded: false,
			title: null
		}),
		async created() {
			const result = await this.$store.dispatch(
				'shopify/blog/fetchFirstArticleByTags',
				'page:contact'
			);
			
			this.loaded = true;
			
			if ( ! result) {
				return this.error = true;
			}
			
			this.article = new Article(result);
			
			this.content = result.contentHtml;
			this.title = result.title;
		}
	};
</script>

<style scoped>

</style>