<template>
	<router-link class="mb-4 product-link"
				 :to="`/product/${ product.handle }`">
		<LoadedImage class="h-full object-cover w-full"
					 :src="product.images[0].src"
					 v-if="product.images.length" />
		<div class="mt-4">
			<span class="mr-4">{{ product.title }}</span>
			<span>{{ product.price }}</span>
		</div>
		<span>{{ o(product.selectElement("#preview")).innerText }}</span>
		
	</router-link>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import Product from "../../modules/shopify/Product";
	
	export default {
		name: "ProductLink",
		props: {
			product: {
				type: Product,
				required: true
			}
		},
		components: {
			LoadedImage
		}
		
	};
</script>

<style lang="scss"
	   scoped>
	.product-link {
		img	{
			height: 60vw;
		}
		width: 48.5%;
		@media (min-width: 768px) {
			img	{
				height: 26vw;
			}
			width: 19%;
		}
	}
</style>