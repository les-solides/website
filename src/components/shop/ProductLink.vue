<template>
	<div class="mb-4 product-link"
		 :class="{ short, small }">
		
		<!-- Image & QuickShop Overlay [start] -->
		<div class="relative"
			 @mouseenter="hover = true"
			 @mouseleave="hover = false">
			
			<!-- Image -->
			<LoadedImage class="h-full object-cover w-full"
						 :src="o(product.images[0]).src" />
			<!-- Image -->
			
			<!-- QuickShop Overlay -->
			<div class="absolute h-full hidden left-0 product-link-overlay top-0 w-full"
				 :class="{ block: hover && hasValidAmountOfOptions }">
				<div class="flex"
					 :key="option.name"
					 :style="variantDynamicHeight"
					 v-for="option of visibleOptions">
					<button class="block h-full items-center left product-link-variant text-center w-1/2"
							:class="{ 'text-gray-600': o(selectedOptionValues.find(o => o.option.id === option.id)).value !== option.values[0]  }"
							@click="selectOptionValue(option, option.values[0])"
							v-if="option.values.length === 2">
						{{ option.values[0] }}
					</button>
					<button class="block h-full items-center right product-link-variant text-center w-1/2"
							:class="{ 'text-gray-600' : o(selectedOptionValues.find(o => o.option.id === option.id)).value !== option.values[1] }"
							@click="selectOptionValue(option, option.values[1])"
							v-if="option.values.length === 2">
						{{ option.values[1] }}
					</button>
					<div v-if="option.values.length > 2">hello</div>
				</div>
				<div class="flex"
					 :style="visiblePairOptionDynamicHeight"
					 v-if="pairOptionName">
					<button class="block h-full items-center right product-link-variant text-center w-1/2"
							:class="{ 'text-gray-600' : o(selectedPairOptionValue).value !== pairOption.values[0] }"
							@click="selectPairOption(pairOption, pairOption.values[0])"
							v-if="pairOption.values.length === 2">
						{{ pairOption.values[0] }}
					</button>
					<button class="block h-full items-center right product-link-variant text-center w-1/2"
							:class="{ 'text-gray-600' : o(selectedPairOptionValue).value !== pairOption.values[1] }"
							@click="selectPairOption(pairOption, pairOption.values[1])"
							v-if="pairOption.values.length === 2">
						{{ pairOption.values[1] }}
					</button>
				</div>
				<button class="text-center w-full"
						@click="addToCart"
						:disabled=" ! selectedVariants.length"
						:class="{ 'text-gray-600': ! selectedVariants.length }"
						style="height: 2vw">
					{{ addingToCart ? 'adding...' : 'add to cart' }}
				</button>
			</div>
			<!-- QuickShop Overlay -->
		
		</div>
		<!-- Image & QuickShop Overlay [end] -->
		
		<!-- Title & Price -->
		<router-link :to="`/product/${ product.handle }`"
					 class="block mt-2 overflow-hidden">
			<span class="mr-4 whitespace-no-wrap">{{ product.title }}</span>
			<span v-if="withPrice">{{ product.price }}</span>
		</router-link>
		<!-- Title & Price -->
		
		<!--<span>{{ o(product.selectElement("#preview")).innerText }}</span>-->
	
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import Product from "../../modules/shopify/Product";
	import OptionModule from "../../modules/shopify/Option";
	import { uniqueId } from "lodash";
	
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
			addingToCart: false,
			hover: false,
			pairOption: new OptionModule({
				id: uniqueId(),
				name: '',
				values: ['single', 'pair']
			}),
			selectedOptionValues: [],
			selectedPairOptionValue: {},
			validAmountOfOptions: 2
		}),
		computed: {
			hasValidAmountOfOptions() {
				return this.product.options.length &&
					this.product.options.length <= this.validAmountOfOptions;
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
				return price;
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
			async addToCart(eventt) {
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