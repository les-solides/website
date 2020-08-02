<template>
	<div class="mb-12 md:mt-4"
		 v-if="product">
		<span class="block text-center w-full">{{ product.title }}</span>
		<div class="flex justify-between mt-2">
			<div class="w-1/3"
				 :class="{ 'mr-4': index < product.images.length - 1 }"
				 :key="image.id"
				 v-for="(image, index) of product.images">
				<LoadedImage class="h-full mb-4 object-cover product-image  w-full"
							 :src="image.src" />
				<div v-if="index === 0">
					<span class="block"
						  :key="tag"
						  v-for="tag of product.tags">{{ tag }}</span>
				</div>
				<span v-if="index === 1"
					  v-html="product.descriptionHtml"></span>
			</div>
		</div>
		
		<span class="block mt-32 text-center w-full">Recommended products</span>
		
		<div class="flex mt-4">
			<ProductLink :product="recommendation"
						 short
						 :key="recommendation.id"
						 :class="{ 'mr-4': index < recommendations.length - 1 }"
						 v-for="(recommendation, index) of recommendations" />
		</div>
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import ProductLink from "./ProductLink";
	
	export default {
		name: "Product",
		components: {ProductLink, LoadedImage},
		data: () => ({
			product: null,
			recommendations: []
		}),
		computed: {
			mainNode() {
				return this.product ?
					   this.product.descriptionNodes.querySelector("ul") : null;
			},
			mainListItems() {
				return this.mainNode ?
					   this.mainNode.querySelectorAll(':scope > li') : [];
			}
		},
		async created() {
			// 1. Fetch the Product via Vuex & Handle
			this.product = await this.$store.dispatch(
				"shopify/product/fetchByHandle",
				this.$route.params.handle
			);
			// 2. Fetch recommended Products
			this.recommendations = await this.$store.dispatch(
				"shopify/product/fetchRecommendations",
				this.product.id
			);
		}
	};
</script>

<style scoped>

</style>