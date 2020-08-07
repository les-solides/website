<template>
	<router-link class="mb-4 product-link"
				 :class="{ short }"
				 :to="`/product/${ product.handle }`">
		<LoadedImage class="h-full object-cover w-full"
					 :src="o(product.images[0]).src" />
		<div class="mt-2">
			<span class="mr-4">{{ product.title }}</span>
			<span>{{ product.price }}</span>
		</div>
		<!--<span>{{ o(product.selectElement("#preview")).innerText }}</span>-->
		
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
			},
			short: {
				type: Boolean,
				default: () => false
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
		&.short {
			img, .empty-image-box {
				height: 45vw;
			}
			@media (min-width: 768px) {
				img, .empty-image-box {
					height: 20vw;
				}
			}
		}
		.empty-image-box {
			background: whitesmoke;
		}
		img, .empty-image-box {
			height: 60vw;
		}
		width: 48.5%;
		@media (min-width: 768px) {
			img, .empty-image-box {
				height: 26vw;
			}
			width: 19%;
		}
	}
</style>