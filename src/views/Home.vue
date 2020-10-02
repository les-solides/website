<template>
	<div>
		<keep-alive :key="article.id"
					v-for="article of homeArticles">
			<component :is="_.startCase(article.template).split(' ').join('')"
					   :article="article"
					   @promise="promises.push($event)" />
		</keep-alive>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	
	import LinkArrow from "../components/template/LinkArrow";
	import LinkProductRow from "../components/template/LinkProductRow";
	import LinkCenterFrame from "../components/template/LinkCenterFrame";
	import LinkTwoFrames from "../components/template/LinkTwoFrames";
	import NewsletterSubscribe from "../components/template/NewsletterSubscribe";
	
	import FrameLink from "../modules/shopify/FrameLink";
	
	export default {
		name: "Home",
		components: {
			LinkArrow,
			LinkCenterFrame,
			LinkTwoFrames,
			LinkProductRow,
			NewsletterSubscribe
		},
		data: () => ({
			FrameLink,
			promises: []
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
			await this.$store.commit('updateLoading', true);
			
			if ( ! this.homeArticles.length) {
				await this.$store.dispatch(
					'shopify/blog/fetchArticlesByBlog',
					'Homepage'
				);
			}
		},
		async mounted() {
			await this.wait(250);
			Promise.allSettled(this.promises)
				   .then(() => this.$store.commit('updateLoading', false));
		}
	};
</script>