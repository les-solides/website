<template>
	<a class="block h1 mt-4 relative"
	   :href="link"
	   v-if="link && link.includes('http')">
		<LoadedImage class="w-full"
					 :src="o(article.featuredImage).originalSrc" />
		<span class="absolute center font-xl text-center w-full">
			{{ article.content }}
		</span>
	</a>
	<router-link class="block h1 mt-4 relative"
				 :to="link"
				 v-else>
		<LoadedImage class="w-full"
					 :src="o(article.featuredImage).originalSrc" />
		<span class="absolute center font-xl text-center w-full">
			{{ article.content }}
		</span>
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