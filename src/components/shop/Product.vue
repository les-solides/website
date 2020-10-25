<template>
	<div>
		<div class="hidden md:block"
			 v-if="product">
			
			<div id="scroller"
				 style="margin-bottom: .5rem"
				 class="flex justify-between mt-2 overflow-x-auto">
				<LoadedImage class="h-full object-cover product-image ws-1/3"
							 :key="image.id"
							 v-for="image of images"
							 :src="image.src" />
			</div>
			
			<div class="flex w-full"
				 style="margin-bottom: var(--header-height)">
				<div class="mr-4 w-1/3">
					<div class="kerned w-full">
						<div>{{ product.title }}</div>
					</div>
				</div>
				<div class="mr-4 w-1/3"
					 v-html="descriptionTag.innerHTML"></div>
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
							<span class="block kapitälchen text-right w-full"
								  v-if="selectedVariants.length">
								{{ price }}
							</span>
							<button @click="addToCart"
									data-text="( add to bag )"
									:disabled="addingToCart || ! o(selectedVariants[0]).available"
									:style="o(selectedVariants[0]).available ? '' : 'color: #8a4646'"
									class="glitch md:w-auto relative text-right w-full">
								{{ addingToCart ? 'adding...' : o(selectedVariants[0]).available ? '( add to bag )' :
								'[out of stock]' }}
								<div class="scanlines"></div>
							</button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="mb-16 ws-1/3"
				 v-html="descriptionRest.innerHTML"></div>
			
			<RecommendedProducts :product="product" />
		</div>
		<PopupMobile class="block md:hidden"
					 :value="true"
					 @close="$router.back()"
					 v-if="product">
			<ProductDetail :product="product"
						   @click="switchProduct($event)" />
		</PopupMobile>
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import Option from "./Option";
	import OptionModule from "./../../modules/shopify/Option";
	import { delay, uniqueId } from "lodash";
	import RecommendedProducts from "./partials/RecommendedProducts";
	import ProductDetail from "./partials/ProductDetail";
	import PopupMobile from "../partials/PopupMobile";
	import HorizontalScrollIndicator from "../../modules/HorizontalScrollIndicator";
	
	export default {
		name: "Product",
		components: {PopupMobile, ProductDetail, RecommendedProducts, Option, LoadedImage},
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
			descriptionRest() {
				if (this.product.hasGoldSilverDescription) {
					return this.selectedSilver ?
						   this.product.descriptionRest
							   .find(d => d.dataset.option === "material:silver") :
						   this.product.descriptionRest
							   .find(d => d.dataset.option === "material:gold");
				}
				return this.product.descriptionRest;
			},
			descriptionTag() {
				if (this.product.hasGoldSilverTag) {
					return this.selectedSilver ?
						   this.product.getDescriptionTagByDataOption('material:silver') :
						   this.product.getDescriptionTagByDataOption('material:gold');
				}
				const tags = document.createElement('div');
				[].forEach.call(this.product.descriptionTags || [], node => tags.appendChild(node));
				return tags;
			},
			images() {
				return this.product.images.filter(i =>
					this.selectedSilver ?
					! i.altText.includes("material:gold") :
					! i.altText.includes("material:silver")
				);
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
			selectedSilver() {
				return this.selectedOptionValues.find(o => o.value === "silver");
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
				this.$toasted.show("added to bag", {
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
				location.href = `/product/${ product.handle }`;
			}
		},
		async created() {
			this.$store.commit('updateLoading', true);
			this.product = await this.$store.dispatch(
				"shopify/product/fetchByHandle",
				this.$route.params.handle
			);
			delay(() => this.$store.commit('updateLoading', false), 500);
			this.$nextTick(async () => {
				await this.wait(2000);
				let indicator = new HorizontalScrollIndicator('#scroller');
				await indicator.start();
			});
		}
	};
</script>

<style scoped>

</style>