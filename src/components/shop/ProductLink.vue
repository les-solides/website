<template>
	<div class="mb-4 product-link"
		 :class="{ short, small }">
		
		<PopupMobile v-model="productDetailsOpen"
					 v-if="popupProduct">
			<ProductDetail :product="popupProduct"
						   @click="switchProduct($event)" />
		</PopupMobile>
		
		<!-- Image & QuickShop Overlay [start] -->
		<div class="relative quick-buy"
			 @mouseenter="hover = true"
			 @mouseleave="hover = false">
			
			<!-- Image -->
			<router-link :to="`/product/${ product.handle }`"
						 class="hidden md:block mt-2 overflow-hidden">
				<LoadedImage class="h-full object-cover w-full"
							 :src="o(imageShown).src || o(imageShown).originalSrc" />
			</router-link>
			<div class="block md:hidden"
				 @click="productDetailsOpen = true">
				<LoadedImage class="h-full object-cover w-full"
							 :src="o(imageShown).src || o(imageShown).originalSrc" />
			</div>
			<!-- Image -->
			
			<!-- QuickShop Overlay -->
			<div class="absolute bg-overlay h-full hidden left-0 product-link-overlay top-0 w-full"
				 :class="{ 'md:block': hover && hasValidAmountOfOptions && quickBuyActive }">
				<div class="flex"
					 :key="option.name"
					 :style="variantDynamicHeight"
					 v-for="option of visibleOptions">
					<button class="block h-full items-center left product-link-variant text-center w-1/2"
							:class="{ 'text-gray-800': o(selectedOptionValues.find(o => o.option.id === option.id)).value !== option.values[0]  }"
							@click="selectOptionValue(option, option.values[0])"
							v-if="option.values.length === 2">
						{{ option.values[0] }}
					</button>
					<button class="block h-full items-center right product-link-variant text-center w-1/2"
							:class="{ 'text-gray-800' : o(selectedOptionValues.find(o => o.option.id === option.id)).value !== option.values[1] }"
							@click="selectOptionValue(option, option.values[1])"
							v-if="option.values.length === 2">
						{{ option.values[1] }}
					</button>
					<div class="flex flex-wrap items-center justify-center w-full"
						 v-if="option.values.length > 2">
						<div>
							<div class="text-center w-full">{{ option.name }}</div>
							<div class="flex justify-center">
								<button @click="selectOptionValue(option, value)"
										class="mr-1"
										:class="{ 'font-bold' : o(selectedOptionValues.find(o => o.option.id === option.id)).value === value }"
										:key="value"
										v-for="(value, index) of option.values">
									{{ value }}{{ option.values.length - 1 > index ? ',' : '' }}
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="flex"
					 :style="visiblePairOptionDynamicHeight"
					 v-if="pairOptionName">
					<button class="block h-full items-center right product-link-variant text-center w-1/2"
							:class="{ 'text-gray-800' : o(selectedPairOptionValue).value !== pairOption.values[0] }"
							@click="selectPairOption(pairOption, pairOption.values[0])"
							v-if="pairOption.values.length === 2">
						{{ pairOption.values[0] }}
					</button>
					<button class="block h-full items-center right product-link-variant text-center w-1/2"
							:class="{ 'text-gray-800' : o(selectedPairOptionValue).value !== pairOption.values[1] }"
							@click="selectPairOption(pairOption, pairOption.values[1])"
							v-if="pairOption.values.length === 2">
						{{ pairOption.values[1] }}
					</button>
				</div>
				<button class="outside-btn text-center w-full"
						@click="addToCart"
						:disabled=" ! selectedVariants.length"
						:class="{ 'text-gray-800': ! selectedVariants.length }"
						style="height: 2vw">
					{{ addingToCart ? 'adding...' : 'add to cart' }}
				</button>
			</div>
			<!-- QuickShop Overlay -->
			
			<!--Buy Buttons (before / without QuickShop) [start]-->
			<div>
				<button class="absolute bg-overlay bottom-0 hidden md:block outside-btn text-center w-full"
						@click="quickBuyActive = true"
						style="height: 2vw"
						v-if="quickShopType !== 0 && hasValidAmountOfOptions && hover && ! quickBuyActive">
					quickbuy
				</button>
				<button class="absolute bg-overlay bottom-0 hidden md:block outside-btn text-center w-full"
						@click="addToCart"
						style="height: 2vw"
						v-if="quickShopType === 0 && hover">
					{{ addingToCart ? 'adding...' : 'add to cart' }}
				</button>
			</div>
			<!--Buy Buttons (before / without QuickShop) [end]-->
		
		</div>
		<!-- Image & QuickShop Overlay [end] -->
		
		<!-- Title & Price -->
		<router-link :to="`/product/${ product.handle }`"
					 class="block mt-2 overflow-hidden">
			<span class="block mr-4 whitespace-no-wrap">{{ product.title }}</span>
			<span v-if="withPrice">{{ price }}</span>
		</router-link>
		<!-- Title & Price -->
	
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import Product from "../../modules/shopify/Product";
	import OptionModule from "../../modules/shopify/Option";
	import { delay, uniqueId } from "lodash";
	import PopupMobile from "../partials/PopupMobile";
	import ProductDetail from "./partials/ProductDetail";
	
	export default {
		name: "ProductLink",
		components: {
			ProductDetail,
			PopupMobile,
			LoadedImage
		},
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
		data: () => ({
			addingToCart: false,
			hover: false,
			pairOption: new OptionModule({
				id: uniqueId(),
				name: '',
				values: ['single', 'pair']
			}),
			popupProduct: null,
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
					v => v.option.name !== option.name
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
			async switchProduct(product) {
				this.$store.commit('updateLoading', true);
				this.popupProduct = await this.$store.dispatch(
					"shopify/product/fetchByHandle",
					product.handle
				);
				delay(() => this.$store.commit('updateLoading', false), 500);
			}
		},
		created() {
			if (this.product.selectedVariant) {
				this.product
					.selectedVariant
					.options
					.forEach(option =>
						this.selectOptionValue(option, option.value)
					);
			}
			this.popupProduct = this.product;
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
		
		button.outside-btn {
			border-top: 1px solid white;
		}
	}
</style>