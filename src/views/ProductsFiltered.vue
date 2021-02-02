<template>
	<div>
		<NavigationFilter base="/products"
						  class="bg-white block md:hidden ml-0 py-4 sticky top-4 md:top-0 z-10"
						  name="Navigation (Products)" />
		<NavigationSubfilter
				v-if="$route.params.collection === 'jewelry'" />
		<div class="flex flex-wrap"
			 :key="o(chunk[0]).id"
			 v-for="chunk of chunkedArray">
			<ProductLink :class="{
							'mr-4': (index % 2) - 1,
							'md:mr-4': (index % 5) - 4,
							'md:mr-0': (index % 5) - 5
						 }"
						 :product="product"
						 :key="product.id"
						 v-for="(product, index) of chunk" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { shuffle } from "lodash";
	
	import NavigationFilter from "../components/partials/NavigationFilter";
	import ProductLink from "../components/shop/ProductLink";
	import NavigationSubfilter from "../components/partials/NavigationSubfilter";
	
	export default {
		name: "ProductsFiltered",
		components: {
			NavigationSubfilter,
			ProductLink,
			NavigationFilter
		},
		computed: {
			...mapGetters("shopify/product", ["allProducts"]),
			amountPerChunk() {
				return this.filteredProducts.length;
			},
			chunkedArray() {
				return this.chunkArray(
					shuffle([...this.filteredProducts]),
					this.amountPerChunk
				);
			},
			filteredProducts() {
				const products = this.unarchivedProducts.filter(p =>
					p.collections.find(c => c.title === this.$route.params.collection) &&
					(p.variants.find(v => v.title === this.$route.params.variant) ||
					(p.productType && p.productType.toLowerCase() === this.$route.params.variant)) ||
					p.collections.find(c => c.title === this.$route.params.variant)
				);
				products.forEach(p =>
					p.selectedVariant = p.variants.find(v => v.title === this.$route.params.variant)
				);
				return products;
			},
			unarchivedProducts() {
				return this.allProducts.filter(p =>
					! p.getTag(/archive:*/, /archive:*/)
				);
			}
		},
		methods: {
			chunkArray(myArray, chunk_size) {
				let index = 0;
				let arrayLength = myArray.length;
				let tempArray = [];
				
				for (index = 0; index < arrayLength; index += chunk_size) {
					let myChunk = myArray.slice(index, index + chunk_size);
					// Do something if you want with the group
					tempArray.push(myChunk);
				}
				
				return tempArray;
			}
		},
		metaInfo: {
			meta: [
				{
					name: "description",
					content: "les solides is inspired by nature, the people and craftsmanship. all their products are produced locally in bali and their vision is to preserve the traditional craftsmanship and to build sustainable and personal relationships with their producers. anna z’brun sees her label as a counterpoint to mass consumption and fast pace, she relies on minimal and timeless design."
				}
			],
		},
		async created() {
			// this.$store.commit('updateLoading', true);
			this.article = (await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				"Products Page (Main)"
			))?.[0];
			this.$nextTick(() => {
				if ( ! this.amountPerChunk) {
					this.$store.dispatch('goToNotFound');
				}
			})
			this.$store.commit('updateLoading', false);
		}
	};
</script>
<style scoped
	   lang="scss">
	.magnified h1 {
		font-size: 2rem;
	}
</style>