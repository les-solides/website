<template>
	<router-link :to="`/product/${ product.handle }`"
				 class="block line-height-1 overflow-hidden">
		<div class="flex flex-wrap justify-between">
			<span class="block line-height-1 mr-2 mt-2 whitespace-no-wrap" style="line-height: .7">
				{{ product.title }}
			</span>
			<div class="line-height-1 mt-2"
				 style="color: #8a4646;line-height: .7"
				 v-if=" ! o(product.selectedVariant).available">
				[out of stock]
			</div>
		</div>
		<span class="block kapitälchen line-height-1 mt-1"
			  v-if="withPrice">
			{{ price }}
		</span>
	</router-link>
</template>

<script>
	import Product from "../../../modules/shopify/Product";
	
	export default {
		name: "ProductTitlePrice",
		props: {
			product: {
				type: Product,
				required: true
			},
			quickShopType: {
				type: Number,
				default() {
					return 1;
				}
			},
			selectedVariants: {
				type: Array,
				default() {
					return [];
				}
			},
			selectedPairOptionValue: {
				type: Object,
				default() {
					return {};
				}
			},
			withPrice: {
				type: Boolean,
				default() {
					return true;
				}
			}
		},
		computed: {
			price() {
				let price = 0;
				for (let variant of this.selectedVariants) {
					price += Number(variant.price.amount);
				}
				if (this.quickShopType === 2 && this.selectedPairOptionValue.value === "pair") {
					price = price * 2;
				}
				return price ? `CHF ${ price.toFixed(2) }` : this.product.price;
			}
		}
	};
</script>