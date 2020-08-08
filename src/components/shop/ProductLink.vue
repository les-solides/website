<template>
	<router-link class="mb-4 product-link"
				 :class="{ short, small }"
				 :to="`/product/${ product.handle }`">
		<LoadedImage class="h-full object-cover w-full"
					 :src="o(product.images[0]).src" />
		<div class="mt-2 overflow-hidden">
			<span class="mr-4 whitespace-no-wrap">{{ product.title }}</span>
			<span v-if="withPrice">{{ product.price }}</span>
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
			},
			small: {
				type: Boolean,
				default: () => false
			},
			withPrice: {
				type: Boolean,
				default: () => true
			},
		},
		components: {
			LoadedImage
		}
		
	};
</script>

<style lang="scss"
	   scoped>
	.collaboration .product-link {
		img, .empty-image-box {
			height: 50vw;
		}
	}
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
			&.small {
				img, .empty-image-box {
					height: 13vw;
				}
				width: 9%;
			}
		}
	}
</style>