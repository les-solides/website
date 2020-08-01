<template>
	<div>
		<component class="mb-8"
				   :is="_.startCase(article.template).split(' ').join('')"
				   :key="article.id"
				   :article="article"
				   v-for="article of productsArticles" />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	
	import LinkArrow from "../components/template/LinkArrow";
	import LinkArrowImage from "../components/template/LinkArrowImage";
	import LinkProductRow from "../components/template/LinkProductRow";
	import LinkTwoFrames from "../components/template/LinkTwoFrames";
	import NewsletterSubscribe from "../components/template/NewsletterSubscribe";
	
	import FrameLink from "../modules/shopify/FrameLink";
	
	export default {
		name: "Products",
		components: {
			LinkArrow,
			LinkArrowImage,
			LinkTwoFrames,
			LinkProductRow,
			NewsletterSubscribe
		},
		data: () => ({
			FrameLink
		}),
		computed: {
			...mapGetters("shopify/blog", ["articles"]),
			filter() {
				if (this.$route.params.filter) {
					return [
						`collection:${ this.$route.params.collection }`,
						`filter:${ this.$route.params.filter }`
					];
				}
				if (this.$route.params.collection) {
					return [
						`collection:${ this.$route.params.collection }`
					]
				}
				return [];
			},
			productsArticles() {
				if (this.$route.params.filter) {
					return this.articles
							   .filter(a => a.blogTitle === this.type)
							   .filter(a => a.hasTag(`filter:${ this.$route.params.filter }`))
							   .filter(a => a.hasTag(`collection:${ this.$route.params.collection }`))
							   .sort((a, b) => a.order - b.order);
				}
				if (this.$route.params.collection) {
					return this.articles
							   .filter(a => a.blogTitle === this.type)
							   .filter(a => a.hasTag(`collection:${ this.$route.params.collection }`))
							   .filter(a => ! a.hasTag(/filter:(.*)/))
							   .sort((a, b) => a.order - b.order);
				}
				return this.articles
						   .filter(a => a.blogTitle === this.type)
						   .filter(a => ! a.hasTag(/filter:(.*)/))
						   .filter(a => ! a.hasTag(/collection:(.*)/))
						   .sort((a, b) => a.order - b.order);
			},
			type() {
				if (this.$route.params.filter) {
					return "Products Page (Filter)";
				}
				if (this.$route.params.collection) {
					return "Products Page (Collection)";
				}
				return "Products Page (Main)";
			}
		},
		async created() {
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				this.type
			);
		},
		async updated() {
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				this.type
			);
		}
	};
</script>