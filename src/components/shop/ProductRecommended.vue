<template>
	<a :href="product.handle"
	   :class="{ mobile }"
	   class="mb-4 product-link"
	   v-if=" ! mobile">
		
		<!-- Image & QuickShop Overlay [start] -->
		<div class="relative quick-buy">
			
			<!-- Image -->
			<div class="block">
				<LoadedImage class="h-full object-cover w-full"
							 :src="o(imageShown).src || o(imageShown).originalSrc" />
			</div>
			<!-- Image -->
		
		</div>
		<!-- Image & QuickShop Overlay [end] -->
		
		<!-- Title & Price -->
		<router-link :to="`/product/${ product.handle }`"
					 class="block mt-2 overflow-hidden">
			<span class="block mr-4 whitespace-no-wrap">{{ product.title }}</span>
			<span>{{ price }}</span>
		</router-link>
		<!-- Title & Price -->
	</a>
	
	<!--copy and change to div on changes and change :href to @click="$emit('click', product)"-->
	
	<li class="mb-4 product-link"
		:class="{ mobile }"
		 @click="$emit('click', product)"
		 v-else>
		
		<!-- Image & QuickShop Overlay [start] -->
		<div class="relative quick-buy">
			
			<!-- Image -->
			<div class="block">
				<LoadedImage class="h-full object-cover w-full"
							 :src="o(imageShown).src || o(imageShown).originalSrc" />
			</div>
			<!-- Image -->
		
		</div>
		<!-- Image & QuickShop Overlay [end] -->
		
		<!-- Title & Price -->
		<router-link :to="`/product/${ product.handle }`"
					 class="block mt-2 overflow-hidden">
			<span class="block mr-4 whitespace-no-wrap">{{ product.title }}</span>
			<span>{{ price }}</span>
		</router-link>
		<!-- Title & Price -->
	</li>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import Product from "../../modules/shopify/Product";
	
	export default {
		name: "ProductRecommended",
		components: {
			LoadedImage
		},
		props: {
			mobile: {
				type: Boolean,
				default() {
					return false;
				}
			},
			product: {
				type: Product,
				required: true
			}
		},
		computed: {
			imageShown() {
				return this.product.images[0];
			},
			price() {
				return this.product.price;
			}
		}
	};
</script>

<style lang="scss"
	   scoped>
	/*todo:refactor*/
	.collaboration .product-link {
		img, .empty-image-box {
			height: 50vw;
		}
	}
	
	.product-link {
		&.mobile {
			min-width: 45vw;
		}
		.product-link-overlay {
			&.md\:block {
				@media (min-width: 768px) {
					display: block !important;
				}
			}
		}
		
		.product-link-variant {
			/*border-bottom: 1px solid white;*/
			border-top: 1px solid white;
			
			/*&.left {
				border-right: 1px white solid;
			}*/
			
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
					height: 22vw;
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
				height: 22vw;
			}
			width: 19%;
			&.small {
				img, .empty-image-box {
					height: 13vw;
				}
				
				width: 9%;
			}
		}
		
		button.outside-btn {
			border-top: 1px solid white;
		}
	}
</style>