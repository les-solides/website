<template>
	<div>
		<NavigationFilter base="/products"
						  class="bg-white block md:hidden ml-0 py-4 sticky top-0 z-10"
						  name="Navigation (Products)" />
		<div :key="article.id"
					v-for="article of productsArticles">
			<component class="mb-8"
					   :is="_.startCase(article.template).split(' ').join('')"
					   :article="article"
					   @promise="promises.push($event)" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	
	import LinkArrow from "../components/template/LinkArrow";
	import LinkArrowImage from "../components/template/LinkArrowImage";
	import LinkProductFilter from "../components/template/LinkProductFilter";
	import LinkProductRow from "../components/template/LinkProductRow";
	import LinkTwoFrames from "../components/template/LinkTwoFrames";
	import NewsletterSubscribe from "../components/template/NewsletterSubscribe";
	
	import FrameLink from "../modules/shopify/FrameLink";
	import NavigationFilter from "../components/partials/NavigationFilter";
	
	export default {
		name: "Products",
		components: {
			NavigationFilter,
			LinkArrow,
			LinkArrowImage,
			LinkTwoFrames,
			LinkProductFilter,
			LinkProductRow,
			NewsletterSubscribe
		},
		data: () => ({
			FrameLink,
			promises: []
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
			await this.$store.commit('updateLoading', true);
			if ( ! this.productsArticles.length) {
				await this.$store.dispatch(
					'shopify/blog/fetchArticlesByBlog',
					this.type
				);
			}
		},
		async mounted() {
			await this.wait(250);
			Promise.allSettled(this.promises)
				   .then(() => this.$store.commit('updateLoading', false));
		},
		async updated() {
			await this.$store.commit('updateLoading', true);
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				this.type
			);
			await this.wait(250);
			Promise.allSettled(this.promises)
				   .then(() => this.$store.commit('updateLoading', false));
		}
	};
</script>