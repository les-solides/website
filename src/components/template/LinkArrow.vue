<template>
	<!-- .h1 -->
	<a class="block italic link mt-minus-4"
	   style="margin-bottom: var(--header-height)"
	   :href="article.content"
	   v-if="article.content && article.content.includes('http')">
		{{ article.title }}
	</a>
	<router-link class="block italic mt-minus-4 router-link"
				 style="margin-bottom: var(--header-height)"
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