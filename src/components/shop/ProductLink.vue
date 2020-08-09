<template>
	<router-link class="mb-4 product-link"
				 :class="{ short, small }"
				 :to="`/product/${ product.handle }`">
		<div class="relative"
			 @mouseenter="hover = true"
			 @mouseleave="hover = false">
			<LoadedImage class="h-full object-cover w-full"
						 :src="o(product.images[0]).src" />
			<div class="absolute h-full hidden left-0 product-link-overlay top-0 w-full"
				 :class="{ block: hover && hasValidAmountOfOptions }">
				<div class="flex"
					 :key="option.name"
					 style="height: 12vw;"
					 v-for="option of product.options">
					<div class="flex items-center left product-link-variant w-1/2"
						 v-if="option.values.length === 2">
						<div class="mx-auto">{{ option.values[0] }}</div>
					</div>
					<div class="flex items-center right product-link-variant w-1/2"
						 v-if="option.values.length === 2">
						<div class="mx-auto">{{ option.values[1] }}</div>
					</div>
					<div v-if="option.values.length > 2">hello</div>
				</div>
				<button class="text-center w-full"
						style="height: 2vw">add to cart
				</button>
			</div>
		</div>
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
			}
		},
		components: {
			LoadedImage
		},
		data: () => ({
			hover: false,
			validAmountOfOptions: 2
		}),
		computed: {
			hasValidAmountOfOptions() {
				return this.product.options.length &&
					this.product.options.length <= this.validAmountOfOptions;
			}
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
		.product-link-overlay {
			background: #ffffff55;
			
			&.block {
				display: block !important;
			}
		}
		
		.product-link-variant {
			border-bottom: 1px solid white;
			border-top: 1px solid white;
			
			&.left {
				border-right: 1px white solid;
			}
			
			&.right {
				border-left: 1px white solid;
			}
			
			> div {
				color: #4D4D4D;
			}
		}
		
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