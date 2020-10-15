<template>
	<div class="footer-page h-full flex items-center w-full">
		<NewsletterSubscribeBig
				class="w-full"
				:article="article"
				v-if="article" />
		<Error v-if="loaded && error" />
	</div>
</template>

<script>
	import Error from "../../components/partials/Error";
	import Article from "../../modules/shopify/blog/Article";
	import NewsletterSubscribeBig from "../../components/template/NewsletterSubscribeBig";
	
	export default {
		name: "NewsletterSignup",
		components: {NewsletterSubscribeBig, Error},
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
				'page:newsletter-signup'
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