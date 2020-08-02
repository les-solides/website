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
	
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "Product",
		components: {LoadedImage},
		data: () => ({
			product: null
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
		}
	};
</script>

<style scoped>

</style>