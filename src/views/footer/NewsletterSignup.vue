<template>
	<div class="footer-page w-full">
		<NewsletterSubscribe :article="article" v-if="article"/>
		<Error v-if="loaded && error" />
	</div>
</template>

<script>
	import Error from "../../components/partials/Error";
	import NewsletterSubscribe from "../../components/template/NewsletterSubscribe";
	import Article from "../../modules/shopify/blog/Article";
	export default {
		name: "NewsletterSignup",
		components: {NewsletterSubscribe, Error},
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