<template>
	<div class="mb-12 md:mt-4"
		 v-if="product">
		<span class="block text-center w-full">{{ product.title }}</span>
		<div class="flex justify-between mt-2">
			<div class="w-1/3"
				 :class="{ 'mr-4': index < product.images.length - 1 }"
				 :key="image.id"
				 v-for="(image, index) of product.images.splice(0,3)">
				<LoadedImage class="h-full mb-4 object-cover product-image  w-full"
							 :src="image.src" />
				<div v-if="index === 0">
					<span class="block"
						  :key="tag"
						  v-for="tag of product.tags.filter(t => ! t.includes('archive') && ! t.includes('variant-rule'))">
						{{ tag }}
					</span>
				</div>
				<span v-if="index === 1"
					  v-html="product.descriptionHtml"></span>
				<div class="flex justify-between md:flex-wrap"
					 v-if="index === 2">
					<div class="md:w-1/2">
						<Option :option="pairOption"
								@select="selectPairOption(pairOption, $event)"
								v-if="pairOptionName" />
						<Option :option="option"
								:key="option.id"
								@select="selectOptionValue(option, $event)"
								v-for="option of visibleOptions" />
					</div>
					<button @click="addToCart"
							:disabled="addingToCart"
							class="md:w-1/2 text-right">
						{{ addingToCart ? 'adding...' : 'add to cart' }}
					</button>
				</div>
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
	import Option from "./Option";
	import ProductLink from "./ProductLink";
	import OptionModule from "./../../modules/shopify/Option";
	import { uniqueId } from "lodash";
	
	export default {
		name: "Product",
		components: {Option, ProductLink, LoadedImage},
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
				return price;
			},
			selectedVariants() {
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