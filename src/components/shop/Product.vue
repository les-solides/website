<template>
	<div>
		<div class="hidden md:block"
			 v-if="product">
			
			<div id="scroller"
				 style="margin-bottom: .5rem"
				 class="flex mt-2 overflow-x-auto">
				<LoadedImage class="h-full object-cover product-image ws-1/3"
							 :key="image.id"
							 :class="{
									'mr-4': index < images.length - 1,
									'object-cover w-1/3': index < 3
							}"
							 v-for="(image, index) of images"
							 :src="image.src" />
			</div>
			
			<div class="flex w-full"
				 style="margin-bottom: var(--header-height)">
				<div class="mr-4 w-1/3">
					<div class="kerned w-full">
						<div>{{ product.title }}</div>
					</div>
				</div>
				<div class="description mr-4 w-1/3"
					 v-html="o(descriptionTag).innerHTML"></div>
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
							<button @click="openSizeGuide"
									class="text-link"
									v-if="isRing">
								don't know your size?
							</button>
						</div>
						<div class="flex flex-wrap justify-end w-1/2">
							<span class="block kapitälchen text-right w-full"
								  v-if="selectedVariants.length">
								{{ price }}
							</span>
							<button @click="addToCart"
									data-text="( add to cart )"
									:disabled="addingToCart || ! o(selectedVariants[0]).available"
									:style="o(selectedVariants[0]).available ? 'color:purple' : 'color: #8a4646'"
									class="md:w-auto mt-5 relative text-link text-right w-full">
								{{ addingToCart ? 'adding...' : o(selectedVariants[0]).available ? '( add to cart )' :
								'[out of stock]' }}
								<div class="scanlines"></div>
							</button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="description text-purple ws-1/3"
				 style="margin-bottom: var(--header-height)"
				 v-html="o(descriptionRest).innerHTML"></div>
			
			<AddOnProducts
					:name="product.id"
					:product="product" />
			
			<RecommendedProducts
					:name="product.id"
					:product="product" />
		</div>
		<!--<PopupMobile class="block md:hidden"
					 :value="true"
					 @close="$router.back()"
					 v-if="product">
			<ProductDetail :product="product"
						   @click="switchProduct($event)" />
		</PopupMobile>-->
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	import Option from "./Option";
	import OptionModule from "./../../modules/shopify/Option";
	import { delay, uniqueId } from "lodash";
	import RecommendedProducts from "./partials/RecommendedProducts";
	import HorizontalScrollIndicator from "../../modules/HorizontalScrollIndicator";
	import AddOnProducts from "./partials/AddOnProducts";
	import Footer from "../../modules/Footer";
	
	export default {
		name: "Product",
		components: {AddOnProducts, RecommendedProducts, Option, LoadedImage},
		data: () => ({
			addingToCart: false,
			pairOption: new OptionModule({
				id: uniqueId(),
				name: '',
				values: ['pair', 'single']
			}),
			recommendations: [],
			selectedOptionValues: [],
			selectedPairOptionValue: {}
		}),
		computed: {
			descriptionRest() {
				if (this.product?.hasGoldSilverDescription) {
					return this.selectedSilver ?
						   this.product.descriptionRest
							   .find(d => d.dataset.option === "material:silver") :
						   this.product.descriptionRest
							   .find(d => d.dataset.option === "material:gold");
				}
				return this.product?.descriptionRest;
			},
			descriptionTag() {
				if (this.product?.hasGoldSilverTag) {
					return this.selectedSilver ?
						   this.product.getDescriptionTagByDataOption('material:silver') :
						   this.product.getDescriptionTagByDataOption('material:gold');
				}
				const tags = document.createElement('div');
				[].forEach.call(this.product?.descriptionTags || [], node => tags.appendChild(node));
				return tags;
			},
			images() {
				if ( ! this.product) {
					return [];
				}
				return this.product?.images.filter(i =>
					this.selectedSilver ?
					! i.altText.includes("material:gold") :
					! i.altText.includes("material:silver")
				);
			},
			isRing() {
				return this.product && this.product.options.find(o => o.name === 'choose your size');
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
			product() {
				return this.$store.getters['shopify/product/byHandle'](this.$route.params.handle);
			},
			price() {
				if ( ! this.product) {
					return 0;
				}
				let price = 0;
				for (let variant of this.selectedVariants) {
					price += Number(variant.price.amount);
				}
				if (this.quickShopType === 2 && this.selectedPairOptionValue.value === "pair") {
					price = price * 2;
				}
				return price ? `CHF ${ price.toFixed(2) }` : this.product.price;
			},
			productId() {
				return this.product?.id;
			},
			quickShopType() {
				if ( ! this.product) {
					return;
				}
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
				if ( ! this.product) {
					return;
				}
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
				if ( ! this.product) {
					return;
				}
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
					this.$analytics.fbq.event("AddToCart", {
						content_name: variant.title,
						content_category: this.o(this.o(this.o(this.product).collections)[0]).title,
						content_ids: [variant.id],
						content_type: this.o(this.product).productType,
						value: this.o(this.o(variant).price).amount,
						currency: "CHF"
					});
				}
				this.addingToCart = false;
				this.$toasted.show("added to cart", {
					duration: 5000,
					position: "bottom-center"
				});
			},
			async load() {
				// this.$store.commit('updateLoading', true);
				await this.wait(2000);
				this.$nextTick(async () => {
					// await this.wait(2000);
					let indicator = new HorizontalScrollIndicator('#scroller');
					await indicator.start();
				});
			},
			openSizeGuide() {
				this.$store.commit('updateFooterRoute', Footer.routes.SIZE);
				this.$store.commit('updateFooterOpen', true);
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
		metaInfo() {
			const product = this.product;
			return {
				title: () => product?.title || 'product',
				meta: [
					{
						name: "description",
						content: this.product?._graph?.description
					}
				],
			}
		},
		async created() {
			await this.load();
			this.$store.commit('updateLoading', false);
			this.$store.commit('shopify/product/updateSelectedProduct', this.product);
			this.$analytics.fbq.event('ViewContent', {
				content_name: this.product.title,
				content_category: this.o(this.o(this.o(this.product).collections)[0]).title,
				content_ids: [this.product.id],
				content_type: this.o(this.product).productType,
				value: this.o(this.o(this.product).price).amount,
				currency: "CHF"
			});
		},
		watch: {
			async $route() {
				await this.load();
				this.$store.commit('updateLoading', false);
				this.$store.commit('shopify/product/updateSelectedProduct', this.product);
			}
		}
	};
</script>

<style scoped>

</style>