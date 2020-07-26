<template>
	<component :is="_.startCase(article.template).split(' ').join('')"
			   :article="article"
			   :fallback-route="article.filterTags(/fallback-route:(.*)/, 'fallback-route:')"
			   v-if="article" />
</template>

<script>
	import { mapGetters } from "vuex";
	import LinkHorizontalGallery from "../components/template/LinkHorizontalGallery";
	
	export default {
		name: "Landing",
		components: {
			LinkHorizontalGallery
		},
		computed: {
			...mapGetters("shopify/blog", ["articles"]),
			article() {
				return this.articles
						   .find(a => a.blogTitle === "Landing Page");
			}
		},
		async created() {
			if ( ! this.article) {
				await this.$store.dispatch(
					'shopify/blog/fetchArticlesByBlog',
					'Landing Page'
				);
			}
		}
	};
</script>