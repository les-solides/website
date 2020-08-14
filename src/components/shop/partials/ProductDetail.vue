<template>
	<div class="overflow-y-auto relative"
		 style="height: 95%">
		<!-- Image & QuickShop Overlay [start] -->
		<div class="sticky top-0 quick-buy"
			 @mouseenter="hover = true"
			 @mouseleave="hover = false">
			<!-- Image -->
			<div class="block md:hidden"
				 style="height: 125vw">
				<LoadedImage class="h-full object-cover w-full"
							 :src="o(imageShown).src || o(imageShown).originalSrc" />
			</div>
			<!-- Image -->
		</div>
		<!-- Image & QuickShop Overlay [end] -->
		
		<div class="bg-white py-4 relative z-10">
			<div class="flex justify-between">
				<!-- Title & Price -->
				<div class="block overflow-hidden">
					<span class="block mr-4 whitespace-no-wrap">{{ product.title }}</span>
					<span>{{ price }}</span>
				</div>
				<!-- Title & Price -->
				<ArrowUp />
			</div>
			
			<div class="flex justify-between mt-8">
				<div v-if="product.variants.length > 1">
					<Option :option="option"
							:key="option.id"
							@select="selectOptionValue(option, $event)"
							v-for="option of visibleOptions" />
					<Option :option="pairOption"
							@select="selectPairOption(pairOption, $event)"
							v-if="pairOptionName" />
				</div>
			</div>
			
			<button class="border-btn my-8 px-6 py-4 w-full"
					@click="addToCart"
					:disabled="addingToCart">
				{{ addingToCart ? 'adding...' : 'add to cart' }}
			</button>
			
			<span class="block"
				  :key="tag"
				  v-for="tag of product.tags.filter(t => ! t.includes('archive') && ! t.includes('variant-rule'))">
				{{ tag }}
			</span>
			
			<div class="mt-8"
				 v-html="product.descriptionHtml"></div>
			
			<!--todo: recommended mobile component that just switches the product prop-->
			<RecommendedProducts :product="product"
								 @click="switchProduct($event)"
								 mobile
								 v-if="product" />
		</div>
	
	</div>
</template>

<script>
	import Product from "../../../modules/shopify/Product";
	import OptionModule from "../../../modules/shopify/Option";
	import { delay, uniqueId } from "lodash";
	import LoadedImage from "../../partials/LoadedImage";
	import ArrowUp from "../../partials/ArrowUp";
	import Option from "../Option";
	import RecommendedProducts from "./RecommendedProducts";
	
	export default {
		name: "ProductDetail",
		components: {RecommendedProducts, Option, ArrowUp, LoadedImage},
		props: {
			product: {
				type: Product,
				required: true
			}
		},
		data: () => ({
			addingToCart: false,
			hover: false,
			pairOption: new OptionModule({
				id: uniqueId(),
				name: '',
				values: ['single', 'pair']
			}),
			productDetailsOpen: false,
			selectedOptionValues: [],
			selectedPairOptionValue: {},
			quickBuyActive: false,
			validAmountOfOptions: 2
		}),
		computed: {
			hasValidAmountOfOptions() {
				return this.product.options.length &&
					this.product.options.length <= this.validAmountOfOptions;
			},
			imageShown() {
				if ( ! this.product || ! this.product.images.length) {
					return {};
				}
				if (this.selectedVariants.length) {
					return this.selectedVariants[0].image || this.product.images[0];
				}
				if (this.hover) {
					return this.product.images[1] || this.product.images[0];
				}
				return this.product.images[0];
			},
			mainNode() {
				return this.product ?
					   this.product.descriptionNodes.querySelector("ul") : null;
			},
			mainListItems() {
				return this.mainNode ?
					   this.mainNode.querySelectorAll(':scope > li') : [];
			},
			pairOptionName() {
				return this.product ? this.product.getTag(
					/^variant-rule-pairs:(.*)/, 'variant-rule-pairs:'
				) : null;
			},
			price() {
				let price = 0;
				for (let variant of this.selectedVariants) {
					price += Number(variant.price.amount);
				}
				if (this.quickShopType === 2 && this.selectedPairOptionValue.value === "pair") {
					price = price * 2;
				}
				return price ? `CHF ${ price.toFixed(2) }` : this.product.price;
			},
			quickShopType() {
				if (this.product.options.length === 1 && this.product.variants.length === 1) {
					return 0;
				}
				if (this.product.options.length === 1 && this.product.variants.length === 2) {
					return this.pairOptionName === "default" ? 2 : 1;
				}
				if (this.product.options.length === 2 && this.product.variants.length === 4) {
					return this.pairOptionName === "side" ? 4 : 3;
				}
				if (this.product.options.length === 2) {
					return 5;
				}
				return 6;
			},
			selectedVariants() {
				return this.product && Array.isArray(this.product.variants) ?
					   this.product.variants.filter(variant =>
						   variant.options.filter(o =>
							   (this.pairOptionName === o.name && this.selectedPairOptionValue.value === "pair") ||
							   this.selectedOptionValues.find(optionValue =>
								   o.name === optionValue.option.name &&
								   o.value === optionValue.value
							   )
						   ).length === this.product.options.length
					   ) : [];
			},
			variantDynamicHeight() {
				if (this.visibleOptions.length === 1) {
					return this.pairOptionName ?
						   "height:12vw" : "height: 24vw";
				}
				if (this.visibleOptions.length === 2) {
					return this.pairOptionName ?
						   "height:8vw" : "height: 12vw";
				}
				return "height: 0";
			},
			visiblePairOptionDynamicHeight() {
				if (this.quickShopType === 2 && this.selectedPairOptionValue.value !== "pair") {
					return "height:12vw";
				}
				if ( ! this.selectedPairOptionValue.value && this.visibleOptions.length === 1) {
					return this.o(this.selectedPairOptionValue).value === "pair" ?
						   "height:12vw" : "height: 12vw";
				}
				if (this.visibleOptions.length === 1) {
					return this.o(this.selectedPairOptionValue).value === "pair" ?
						   "height:12vw" : "height: 8vw";
				}
				if (this.visibleOptions.length === 2) {
					return this.o(this.selectedPairOptionValue).value === "pair" ?
						   "height:12vw" : "height: 8vw";
				}
				return "height: 0";
			},
			visibleOptions() {
				return this.product.options.filter(
					o => this.pairOptionName ?
						 o.name !== this.pairOptionName ||
							 this.selectedPairOptionValue.value === 'single' : true
				);
			}
		},
		methods: {
			async addToCart() {
				this.addingToCart = true;
				if (this.quickShopType === 6) {
					return this.$router.push(`/product/${ this.product.handle }`);
				}
				if (this.quickShopType === 0) {
					await this.$store.dispatch(
						"shopify/addToCheckout", {
							variant: this.product.variants[0],
							quantity: 1
						});
					delay(() => this.addingToCart = false, 200);
					return this.$toasted.show("added to cart", {
						duration: 5000,
						position: "bottom-center"
					});
				}
				if (this.quickShopType === 2) {
					await this.$store.dispatch(
						"shopify/addToCheckout", {
							variant: this.selectedVariants[0],
							quantity: 2
						});
					delay(() => this.addingToCart = false, 200);
					return this.$toasted.show("added to cart", {
						duration: 5000,
						position: "bottom-center"
					});
				}
				for (let variant of this.selectedVariants) {
					await this.$store.dispatch(
						"shopify/addToCheckout", {
							variant,
							quantity: 1
						});
				}
				delay(() => this.addingToCart = false, 200);
				this.$toasted.show("added to cart", {
					duration: 5000,
					position: "bottom-center"
				});
			},
			selectOptionValue(option, value) {
				this.selectedOptionValues = this.selectedOptionValues.filter(
					v => v.option.id !== option.id
				);
				this.selectedOptionValues.push({
					option,
					value
				});
			},
			selectPairOption(option, value) {
				this.selectedPairOptionValue = {
					option,
					value
				};
			},
			switchProduct(product) {
				
				this.$emit('click', product);
			}
		}
	};
</script>

<style scoped
	   lang="scss">
	button.border-btn {
		border: 1px solid black;
	}
</style>