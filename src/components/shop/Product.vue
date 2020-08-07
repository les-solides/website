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
						  v-for="tag of product.tags.filter(t => ! t.includes('archive'))">{{ tag }}</span>
				</div>
				<span v-if="index === 1"
					  v-html="product.descriptionHtml"></span>
				<div class="flex justify-between md:flex-wrap"
					 v-if="index === 2">
					<div class="md:w-1/2">
						<Option :option="option"
								:key="_.uniqueId(option.id)"
								@select="selectOptionValue(option, $event)"
								v-for="option of product.options" />
					</div>
					<button @click="addToCart"
							class="md:w-1/2 text-right">
						add to cart
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
	import ProductLink from "./ProductLink";
	import Option from "./Option";
	
	export default {
		name: "Product",
		components: {Option, ProductLink, LoadedImage},
		data: () => ({
			product: null,
			recommendations: [],
			selectedOptionValues: []
		}),
		computed: {
			mainNode() {
				return this.product ?
					   this.product.descriptionNodes.querySelector("ul") : null;
			},
			mainListItems() {
				return this.mainNode ?
					   this.mainNode.querySelectorAll(':scope > li') : [];
			}
		},
		methods: {
			async addToCart() {
				await this.$store.dispatch(
					"shopify/addToCheckout", {
						variant: this.product.selectedVariant,
						quantity: 1
					});
				this.$toasted.show("added to cart", {
					duration: 5000,
					position: "bottom-center"
				});
			},
			selectOptionValue(option, value) {
				this.selectedOptionValues = this.selectedOptionValues
												.filter(v => v.option.id !== option.id);
				this.selectedOptionValues.push({
					option,
					value
				});
				this.updateSelectedVariant();
			},
			updateSelectedVariant() {
				const selectedVariant = this.product.variants.find(variant =>
					variant.options.filter(o =>
						this.selectedOptionValues.find(optionValue =>
							o.name === optionValue.option.name &&
							o.value === optionValue.value
						)
					).length === this.product.options.length
				);
				this.product.selectVariant(selectedVariant);
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