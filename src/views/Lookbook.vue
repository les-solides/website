<template>
	<div>
		<component class="mb-4"
				   :is="_.startCase(article.template).split(' ').join('')"
				   :key="article.id"
				   :article="article"
				   :style="index === 0 ? 'margin-top: -2rem;' : ''"
				   v-for="(article, index) of lookbookArticles" />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	
	import LinkArrow from "../components/template/LinkArrow";
	import LinkProductRow from "../components/template/LinkProductRow";
	import LinkTwoFrames from "../components/template/LinkTwoFrames";
	import Lookbook from "../components/template/Lookbook";
	import NewsletterSubscribe from "../components/template/NewsletterSubscribe";
	
	import FrameLink from "../modules/shopify/FrameLink";
	
	export default {
		name: "Home",
		components: {
			LinkArrow,
			LinkTwoFrames,
			LinkProductRow,
			Lookbook,
			NewsletterSubscribe
		},
		data: () => ({
			FrameLink
		}),
		computed: {
			...mapGetters("shopify/blog", ["articles"]),
			lookbookArticles() {
				return this.articles
						   .filter(a => a.blogTitle === "Lookbook")
						   .sort((a, b) => a.order - b.order);
			}
		},
		metaInfo: {
			title: "lookbook",
			meta: [
				{
					name: "description",
					content: "we are fortunate to be able to work with many talented artists. some of whom capture incredible moods for les solides. visit our lookbook to get inspired."
				}
			],
		},
		async created() {
			if (this.lookbookArticles.length) {
				return;
			}
			
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				'Lookbook'
			);
		}
	};
</script>