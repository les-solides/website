<template>
	<a class="block h1 link mt-4 relative"
	   :href="link"
	   v-if="link && link.includes('http')">
		<LoadedImage class="w-full"
					 :src="o(article.featuredImage).originalSrc" />
		<div class="absolute center font-xl text-center w-full"
			  v-html="article.contentHtml"></div>
	</a>
	<router-link class="block h1 mt-4 relative router-link"
				 :to="link"
				 v-else>
		<LoadedImage class="w-full"
					 :src="o(article.featuredImage).originalSrc" />
		<div class="absolute center font-xl text-center w-full"
			  v-html="article.contentHtml"></div>
	</router-link>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "LinkArrowImage",
		components: {LoadedImage},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		computed: {
			link() {
				return this.article.filterTags(/link:(.*)/, 'link:');
			}
		}
	};
</script>

<style scoped>

</style>