<template>
	<div class="mb-12 md:mt-4"
		 v-if="product">
		
		<span class="block text-center w-full">{{ product.title }}</span>
		
		<div class="flex justify-between mt-2 overflow-x-auto">
			<LoadedImage class="h-full mb-4 object-contain product-image"
						 :class="{
							'mr-2': index < product.images.length - 1,
							 'object-cover w-1/3': index < 3
						}"
						 :key="image.id"
						 v-for="(image, index) of product.images"
						 :src="image.src" />
		</div>
		
		<div class="flex justify-between">
			<div class="mr-4 w-1/3">
					<span class="block"
						  :key="tag"
						  v-for="tag of product.tags.filter(t => ! t.includes('archive') && ! t.includes('variant-rule'))">
						{{ tag }}
					</span>
			</div>
			<span class="mr-4 w-1/3"
				  v-html="product.descriptionHtml"></span>
			<div class="w-1/3">
				<div class="flex justify-between">
					<div class="md:w-1/2">
						<Option :option="option"
								:key="option.id"
								@select="selectOptionValue(option, $event)"
								v-for="option of visibleOptions" />
						<Option :option="pairOption"
								@select="selectPairOption(pairOption, $event)"
								v-if="pairOptionName" />
					</div>
					<div class="flex flex-wrap justify-end w-1/2">
						<span class="block mb-2 text-right w-full"
							  v-if="selectedVariants.length">
								{{ price }}
							</span>
						<button @click="addToCart"
								:disabled="addingToCart"
								class="text-right w-full">
							{{ addingToCart ? 'adding...' : 'add to cart' }}
						</button>
					</div>
				</div>
			</div>
		</div>
		
		<RecommendedProducts :product="product" />
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import Option from "./Option";
	import OptionModule from "./../../modules/shopify/Option";
	import { uniqueId } from "lodash";
	import RecommendedProducts from "./partials/RecommendedProducts";
	
	export default {
		name: "Product",
		components: {RecommendedProducts, Option, LoadedImage},
		data: () => ({
			addingToCart: false,
			pairOption: new OptionModule({
				id: uniqueId(),
				name: '',
				values: ['single', 'pair']
			}),
			product: null,
			recommendations: [],
			selectedOptionValues: [],
			selectedPairOptionValue: {}
		}),
		computed: {
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
				if (this.product.variants.length === 1) {
					return [this.product.variants[0]];
				}
				return this.product ? this.product.variants.filter(variant =>
					variant.options.filter(o =>
						(this.pairOptionName === o.name && this.selectedPairOptionValue.value === "pair") ||
						this.selectedOptionValues.find(optionValue =>
							o.name === optionValue.option.name &&
							o.value === optionValue.value
						)
					).length === this.product.options.length
				) : [];
			},
			visibleOptions() {
				if (this.product.variants.length <= 1) {
					return [];
				}
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
				for (let variant of this.selectedVariants) {
					await this.$store.dispatch(
						"shopify/addToCheckout", {
							variant,
							quantity: 1
						});
				}
				this.addingToCart = false;
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
			}
		},
		async created() {
			this.product = await this.$store.dispatch(
				"shopify/product/fetchByHandle",
				this.$route.params.handle
			);
		}
	};
</script>

<style scoped>

</style>