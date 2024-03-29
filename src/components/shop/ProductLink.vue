<template>
	<div class="product-link"
		 style="margin-bottom: var(--header-height)"
		 :class="{ short, small }"
		 v-if="product">
		
		<!-- Image & QuickShop Overlay [start] -->
		<div @mouseenter="startHover"
			 @mouseleave="unhover"
			 class="relative quick-buy">
			
			<!-- Image & Link Desktop [start] -->
			<router-link
				class="hidden md:block overflow-hidden router-link"
				:to="`/product/${ product.handle }`">
				<LoadedImage
					class="h-full object-cover zoomed w-full"
					:src="o(imageShown).src || o(imageShown).originalSrc" />
			</router-link>
			<!-- Image & Link Desktop [end] -->
			
			<!-- Image & Link Mobile [start] -->
			<div @click="openMobileProduct"
				 class="block md:hidden">
				<LoadedImage
					class="h-full object-cover w-full"
					:src="o(imageShown).src || o(imageShown).originalSrc" />
			</div>
			<!-- Image & Link Mobile [end] -->
			
			<!-- QuickShop Overlay -->
			<div class="absolute h-full hidden left-0 product-link-overlay top-0 w-full"
				 :class="{ 'md:block': hover && hasValidAmountOfOptions && quickBuyActive }"
				 v-if=" ! this.small">
				<div class="flex"
					 :key="option.name"
					 :style="variantDynamicHeight"
					 v-for="option of visibleOptions">
					<button class="block h-full items-center left product-link-variant text-center w-1/2 italic"
							:class="{ 'not-italic': o(selectedOptionValues.find(o => o.option.id === option.id)).value !== option.values[0]  }"
							@click="selectOptionValue(option, option.values[0])"
							v-if="option.values.length === 2 && option.name !== 'choose your size'">
						{{ option.values[0] }}
					</button>
					<button class="block h-full items-center right product-link-variant text-center w-1/2 italic"
							:class="{ 'not-italic' : o(selectedOptionValues.find(o => o.option.id === option.id)).value !== option.values[1] }"
							@click="selectOptionValue(option, option.values[1])"
							v-if="option.values.length === 2 && option.name !== 'choose your size'">
						{{ option.values[1] }}
					</button>
					<div class="flex flex-wrap items-center justify-center w-full"
						 v-if="option.values.length > 2 || option.name === 'choose your size'">
						<div>
							<button @click="openSizeGuide"
									class="cursor-pointer text-center w-full"
									v-if="option.name === 'choose your size'">{{ option.name }}
							</button>
							<div class="text-center w-full"
								 v-if="option.name !== 'choose your size'">
								{{ option.name }}
							</div>
							<div class="flex justify-center">
								<button @click="selectOptionValue(option, value)"
										class="mr-1"
										:class="{ 'italic' : o(selectedOptionValues.find(o => o.option.id === option.id)).value === value }"
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
					<button class="block h-full items-center left product-link-variant text-center w-1/2 italic"
							:class="{ 'not-italic' : o(selectedPairOptionValue).value !== pairOption.values[0] }"
							@click="selectPairOption(pairOption, pairOption.values[0])"
							v-if="pairOption.values.length === 2">
						{{ pairOption.values[0] }}
					</button>
					<button class="block h-full items-center right product-link-variant text-center w-1/2 italic"
							:class="{ 'not-italic' : o(selectedPairOptionValue).value !== pairOption.values[1] }"
							@click="selectPairOption(pairOption, pairOption.values[1])"
							v-if="pairOption.values.length === 2">
						{{ pairOption.values[1] }}
					</button>
				</div>
				<button class="add-to-cart outside-btn text-center w-full"
						@click="addToCart"
						:disabled=" ! selectedVariants.length || ! selectedVariants[0].available"
						:class="{ 'not-italic': ! selectedVariants.length }"
						style="height: 3vw">
					{{ addingToCart ? 'adding...' : 'quick buy' }}
				</button>
			</div>
			<!-- QuickShop Overlay -->
			
			<!--Buy Buttons (before / without QuickShop) [start]-->
			<div v-if=" ! this.small">
				<button class="absolute add-to-cart bottom-0 hidden md:block outside-btn text-center w-full"
						@click="openQuickBuy"
						style="height: 3vw; line-height: 1px"
						v-if="quickShopType !== 0 && hasValidAmountOfOptions && hover && ! quickBuyActive">
					quick buy
				</button>
				
				<!-- Has no variants (QuickShop type 0) -->
				<button class="absolute add-to-cart  bottom-0 hidden md:block outside-btn text-center w-full"
						@click="addToCart"
						:disabled=" ! o(selectedVariants[0]).available"
						style="height: 3vw"
						v-if="quickShopType === 0 && hover">
					{{ addingToCart ? 'adding...' : 'quick buy' }}
				</button>
			</div>
			<!--Buy Buttons (before / without QuickShop) [end]-->
		
		</div>
		<!-- Image & QuickShop Overlay [end] -->
		
		<!-- Title & Price -->
		<ProductTitlePrice
			style="padding-top: 4.8px;"
			with-price
			:product="product"
			:quick-shop-type="quickShopType"
			:selected-variants="selectedVariants"
			:selected-pair-option-value="selectedPairOptionValue" />
		<!-- Title & Price -->
	
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import Product from "../../modules/shopify/Product";
	import OptionModule from "../../modules/shopify/Option";
	import { delay, uniqueId } from "lodash";
	import ProductTitlePrice from "./partials/ProductTitlePrice";
	import Footer from "../../modules/Footer";
	
	export default {
		name: "ProductLink",
		components: {
			ProductTitlePrice,
			LoadedImage
		},
		props: {
			addOnReference: {
				type: Product
			},
			isAddOn: Boolean,
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
			selectedOptionValues: [],
			selectedPairOptionValue: {},
			quickBuyActive: false,
			validAmountOfOptions: 2
		}),
		computed: {
			addOnMainImages() {
				return this.product.getAddOnMainImages(
					this.product,
					this.addOnReference
				);
			},
			addOnImages() {
				return this.product.getAddOnImages(
					this.product,
					this.addOnReference
				);
			},
			addOnImageShown() {
				if (this.hover) {
					if (this.product.materialIsSelected("gold")) {
						return this.addOnMainImages.find(i => i.alt.includes("material:gold"));
					}
					return this.addOnMainImages.find(i => i.alt.includes("material:silver"));
				}
				if (this.product.materialIsSelected("gold")) {
					return this.addOnImages.find(i => i.alt.includes("material:gold"));
				}
				return this.addOnImages.find(i => i.alt.includes("material:silver"));
			},
			
			hasValidAmountOfOptions() {
				return this.product.options.length &&
					this.product.options.length <= this.validAmountOfOptions;
			},
			imageShown() {
				if (this.addOnImages.length) {
					return this.addOnImageShown;
				}
				if (this.hover && this.selectedVariants[0]?.image) {
					return this.selectedVariants[0]?.image;
				}
				if (this.hover) {
					return (this.product.materialIsSelected("gold") ?
							this.product.images[1] : this.product.images[3]) ||
						this.product.images[0];
				}
				return this.selectedVariantImage ||
					this.product.images[0];
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
			quickShopType() {
				
				// if only one variant (default): type 0
				if (this.product.options.length === 1 && this.product.variants.length === 1) {
					return 0;
				}
				
				// if one option with two variants: type 2
				if (this.product.options.length === 1 && this.product.variants.length === 2) {
					return 2;
				}
				
				// if two options with four variants: type 3 & 4
				if (this.product.options.length === 2 && this.product.variants.length === 4) {
					return this.pairOptionName === "side" ? 4 : 3;
				}
				
				// if two options with more than 4 variants: type 5
				if (this.product.options.length === 2) {
					return 5;
				}
				
				return 6;
			},
			selectedVariantImage() {
				return this.product?.selectedVariant?.image;
			},
			selectedVariants() {
				if (this.quickShopType === 0 && this.product) {
					// For products without any options.
					return [
						this.product.selectedVariant ||
						this.product.variants[0]
					];
				}
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
						   "height: 11.5vw" : "height: 23vw";
				}
				if (this.visibleOptions.length === 2) {
					return this.pairOptionName ?
						   "height: 7.666666666vw" : "height: 11.5vw";
				}
				return "height: 0";
			},
			visiblePairOptionDynamicHeight() {
				if (this.quickShopType === 2 && this.selectedPairOptionValue.value !== "pair") {
					return "height: 11.5vw";
				}
				if ( ! this.selectedPairOptionValue.value && this.visibleOptions.length === 1) {
					return this.o(this.selectedPairOptionValue).value === "pair" ?
						   "height: 11.5vw" : "height: 11.5vw";
				}
				if (this.visibleOptions.length === 1) {
					return this.o(this.selectedPairOptionValue).value === "pair" ?
						   "height: 11.5vw" : "height: 7.666666666vw";
				}
				if (this.visibleOptions.length === 2) {
					return this.o(this.selectedPairOptionValue).value === "pair" ?
						   "height: 11.5vw" : "height: 7.666666666vw";
				}
				return "height: 23vw";
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
					// For products without any options.
					await this.$store.dispatch(
						"shopify/addToCheckout", {
							variant: this.product.variants[0],
							quantity: 1
						});
					this.$analytics.fbq.event("AddToCart", {
						content_name: this.o(this.product.variants[0]).title,
						content_category: this.o(this.o(this.o(this.product).collections)[0]).title,
						content_ids: [this.o(this.product.variants[0]).id],
						content_type: this.o(this.product).productType,
						value: this.o(this.o(this.product.variants[0]).price).amount,
						currency: "CHF"
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
							quantity: this.o(this.selectedPairOptionValue).value === "single" ? 1 :
									  this.pairOptionName ? 2 : 1
						});
					this.$analytics.fbq.event("AddToCart", {
						content_name: this.o(this.product.variants[0]).title,
						content_category: this.o(this.o(this.o(this.product).collections)[0]).title,
						content_ids: [this.o(this.product.variants[0]).id],
						content_type: this.o(this.product).productType,
						value: this.o(this.o(this.product.variants[0]).price).amount,
						currency: "CHF"
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
					this.$analytics.fbq.event("AddToCart", {
						content_name: variant.title,
						content_category: this.o(this.o(this.o(this.product).collections)[0]).title,
						content_ids: [variant.id],
						content_type: this.o(this.product).productType,
						value: this.o(this.o(variant).price).amount,
						currency: "CHF"
					});
				}
				
				delay(() => this.addingToCart = false, 200);
				
				this.$toasted.show("added to cart", {
					duration: 5000,
					position: "bottom-center"
				});
			},
			initialize() {
				if (this.product.selectedVariant) {
					this.product
						.selectedVariant
						.options
						.forEach(option =>
							this.selectOptionValue(option, option.value)
						);
				}
				
				this.popupProduct = this.product;
			},
			openMobileProduct() {
				this.$store.commit('shopify/product/updateSelectedProduct', this.product);
			},
			openSizeGuide() {
				this.$store.commit('updateFooterRoute', Footer.routes.SIZE);
				this.$store.commit('updateFooterOpen', true);
			},
			openQuickBuy() {
				this.quickBuyActive = true;
				this.product
					.selectedVariant
					.options
					.forEach(option =>
						this.selectOptionValue(option, option.value)
					);
				if (this.pairOptionName) {
					this.selectPairOption(this.pairOption, "pair");
				}
			},
			productId() {
				return this.product?.id;
			},
			selectOptionValue(option, value) {
				this.selectedOptionValues = this.selectedOptionValues.filter(
					v => v.option.name !== option.name
				);
				this.selectedOptionValues.push({
					option,
					value
				});
				this.product.selectedVariant = this.selectedVariants[0];
			},
			selectPairOption(option, value) {
				this.selectedPairOptionValue = {
					option,
					value
				};
			},
			startHover() {
				this.hover = true;
				this.$forceUpdate();
			},
			async switchProduct(product) {
				this.$store.commit('updateLoading', true);
				this.popupProduct = await this.$store.dispatch(
					"shopify/product/fetchByHandle",
					product.handle
				);
				delay(() => this.$store.commit('updateLoading', false), 500);
			},
			unhover() {
				this.selectedOptionValues = [];
				this.hover = false;
				this.quickBuyActive = false;
			}
		},
		created() {
			this.initialize();
			this.unhover();
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
				@media (min-width: 1024px) {
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
			
			@media (min-width: 1024px) {
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
		
		min-width: calc(50% - .5rem);
		width: calc(50% - .5rem);
		@media (min-width: 1024px) {
			img, .empty-image-box {
				height: 26vw;
			}
			min-width: calc(20% - .8rem);
			width: calc(20% - .8rem);
			&.small {
				img, .empty-image-box {
					height: 12vw;
				}
				
				min-width: calc(10% - .9rem);
				width: calc(10% - .9rem);
			}
		}
		
		button.outside-btn {
			border-top: 1px solid white;
		}
	}
</style>