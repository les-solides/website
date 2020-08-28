<template>
	<a class="block h1 mb-12"
	   :href="article.content"
	   v-if="article.content && article.content.includes('http')">
		{{ article.title }}
	</a>
	<router-link class="block h1 mb-12"
				 :to="article.content"
				 v-else>
		{{ article.title }}
	</router-link>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	
	export default {
		name: "LinkArrow",
		props: {
			article: {
				type: Article,
				required: true
			}
		}
	};
</script>

<style scoped>

</style>