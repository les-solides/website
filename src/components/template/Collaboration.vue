<template>
	<div :id="article.handle"
		 class="collaboration mx-auto">
		<ProductLink :product="products[0]"
					 v-if="products[0]" />
	</div>
</template>

<script>
	import ProductLink from "../shop/ProductLink";
	import Article from "../../modules/shopify/blog/Article";
	
	export default {
		name: "Collaboration",
		components: {ProductLink},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		computed: {
			products() {
				return this.article.products || [];
			}
		}
	};
</script>

<style scoped>

</style>