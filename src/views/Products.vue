<template>
	<div>
		<NavigationFilter base="/products"
						  class="bg-white block md:hidden ml-0 py-4 sticky top-0 z-10"
						  name="Navigation (Products)" />
		<div class="flex flex-wrap"
			 :key="o(chunk[0]).id"
			 v-for="(chunk, index) of chunkedArray">
			<ProductLink :class="{
							'mr-4': (index % 2) - 1,
							'md:mr-4': (index % 5) - 4,
							'md:mr-0': (index % 5) - 5
						 }"
						 :product="product"
						 :key="product.id"
						 v-for="(product, index) of chunk" />
			<router-link class="aspect-height aspect-width block mx-auto relative w-full"
						 style="margin-bottom: var(--header-height)"
						 :to="'/products/' + o(links[index]).href.split('/products/')[1]"
						 v-if="o(links[index]).href">
				<span class="overlay absolute-center flex items-center justify-center magnified w-full"
					  v-html="o(links[index]).innerHTML">
				</span>
				<img class="h-full object-cover w-full"
					 :src="o(images[index]).src"
					 alt="">
			</router-link>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	
	import NavigationFilter from "../components/partials/NavigationFilter";
	import ProductLink from "../components/shop/ProductLink";
	import { shuffle } from "lodash";
	
	export default {
		name: "Products",
		components: {
			ProductLink,
			NavigationFilter
		},
		computed: {
			...mapGetters("shopify/blog", ["articles"]),
			...mapGetters("shopify/product", ["allProducts"]),
			amountPerChunk() {
				const amount = Math.floor(this.allProducts.length / this.links.length);
				return amount - (amount % 5);
			},
			chunkedArray() {
				return this.chunkArray(
					shuffle([...this.allProducts]),
					this.amountPerChunk
				);
			},
			content() {
				return this.articles.find(a =>
					a.title === "Products Page (Main Links)"
				);
			},
			images() {
				if ( ! this.content) {
					return [];
				}
				return Array.from(this.content.images) || [];
			},
			links() {
				if ( ! this.content) {
					return [];
				}
				return Array.from(this.content.selectElements('a'));
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
		async created() {
			this.$store.commit('updateLoading', true);
			this.article = (await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				"Products Page (Main)"
			))?.[0];
			this.$store.commit('updateLoading', false);
		}
	};
</script>
<style scoped
	   lang="scss">
	@import "./../../src/scss/partials/variables";
	.aspect-height {
		height: calc((50vw - 8rem));
		@media screen and (min-width: $breakpoint-md) {
			height: calc((50vw - 8rem));
		}
	}
	.aspect-width {
		@media screen and (min-width: $breakpoint-md) {
			width: calc((50vw - 8rem) * 1.5426744647);
		}
	}
	.magnified h1 {
		font-size: 2rem;
	}
	.overlay {
		width: calc(100vw - 2rem);
	}
</style>