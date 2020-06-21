<template>
	<div>
		<component class="mb-8"
				   :is="_.startCase(article.template).split(' ').join('')"
				   :key="article.id"
				   :article="article"
				   v-for="article of homeArticles" />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	
	import LinkArrow from "../components/template/LinkArrow";
	import LinkProductRow from "../components/template/LinkProductRow";
	import LinkTwoFrames from "../components/template/LinkTwoFrames";
	import NewsletterSubscribe from "../components/template/NewsletterSubscribe";
	
	import FrameLink from "../modules/shopify/FrameLink";
	
	export default {
		name: "Home",
		components: {
			LinkArrow,
			LinkTwoFrames,
			LinkProductRow,
			NewsletterSubscribe
		},
		data: () => ({
			FrameLink
		}),
		computed: {
			...mapGetters("shopify/blog", ["articles"]),
			homeArticles() {
				return this.articles
						   .filter(a => a.blogTitle === "Homepage")
						   .sort((a, b) => a.order - b.order);
			}
		},
		async created() {
			if (this.homeArticles.length) {
				return;
			}
			
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				'Homepage'
			);
		}
	};
</script>