<template>
	<div v-if="chunkedArray.length">
		
		<NavigationFilter
			base="/products"
			class="bg-white block md:hidden ml-0 py-4 sticky top-4 md:top-0 z-10"
			name="Navigation (Products)" />
		
		<NavigationSubfilter
			v-if="$route.params.collection === 'jewelry'" />
		
		<!-- Each chunk has an equal amount of products -->
		<!-- After the equal amount of products an image and links is added -->
		<div class="flex flex-wrap"
			 :key="o(chunk[0]).id"
			 v-for="(chunk, index) of chunkedArray">
			
			<!-- All products of current chunk -->
			<ProductLink
				:class="getProductLinkClassesByIndex(index)"
				:key="o(product).id"
				:product="product"
				v-for="(product, index) of chunk" />
			
			<!-- Link (and image) section after equal amount of products -->
			<router-link
				class="aspect-height aspect-width block mx-auto relative router-link w-full"
				style="margin-bottom: var(--header-height)"
				:to="'/products/' + o(links[index]).href.split('/products/')[1]"
				v-if="chunkHasLink(index)">
				
				<!-- Link text overlay -->
				<span class="overlay absolute-center flex items-center justify-center magnified w-full"
					  v-html="o(links[index]).innerHTML"></span>
				
				<!-- Link image -->
				<img class="h-full object-cover w-full"
					 alt="product image and link in between products"
					 :src="o(images[index]).src">
			
			</router-link>
		
		</div>
	
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	
	import NavigationFilter from "../components/partials/NavigationFilter";
	import ProductLink from "../components/shop/ProductLink";
	import { shuffle } from "lodash";
	import NavigationSubfilter from "../components/partials/NavigationSubfilter";
	
	export default {
		name: "Products",
		components: {
			NavigationFilter,
			NavigationSubfilter,
			ProductLink
		},
		computed: {
			...mapGetters("shopify/blog", ["articles"]),
			...mapGetters("shopify/product", ["allProducts"]),
			amountPerChunk() {
				// The amount of products per chunk based on the amount
				// of links.
				const amount = Math.floor(this.filteredProducts.length / (this.links.length || 1));
				return this.filteredProducts.length <= 5 ? amount : amount - (amount % 5);
			},
			chunkedArray() {
				// The products are divided into equal chunks dependent on
				// the amount of images / links are provided.
				return this.chunkArray(
					shuffle([...this.filteredProducts]),
					this.amountPerChunk
				);
			},
			content() {
				// Finds the "links" blog post from the articles
				// array which is loaded in the created()-hook.
				return this.articles.find(a =>
					a.title === "Products Page (Main Links)"
				);
			},
			images() {
				// The images in between the product chunks.
				if ( ! this.content) {
					return [];
				}
				return Array.from(this.content.images) || [];
			},
			isCollectionPage() {
				return this.$route.name === "products-collection";
			},
			isFilteredPage() {
				return this.$route.name === "products-filtered";
			},
			links() {
				// the links in between the product chunks.
				if ( ! this.content) {
					return [];
				}
				if (this.isCollectionPage || this.isFilteredPage) {
					return [];
				}
				return Array.from(this.content.selectElements('a')) || [];
			},
			filteredProducts() {
				let products = this.allProducts
					// Products that don't have a tag that starts with "archive:".
					.filter(p => ! p.getTag(/archive:*/, /archive:*/))
					// If currently on collection page, show only collections products.
					.filter(p =>
						! this.isCollectionPage ||
						p.collections.find(c => c.handle === this.$route.params.collection)
					);
				
				if (this.isFilteredPage) {
					// See router/index.js to see what a filtered page means.
					products = products.filter(p =>
						// Filter products, which have a variant, where the title equals the variant in the URL.
						(p.variants.find(v => v.title === this.$route.params.variant) ||
							// Or products, where the product type equals the variant in the URL.
							(p.productType && p.productType.toLowerCase() === this.$route.params.variant)) ||
						// Or collections, which a title that equals the variant in the URL.
						p.collections.find(c => c.title === this.$route.params.variant)
					);
					
					products.forEach(p =>
						// Go through each product and select the correct variant.
						p.selectedVariant = p.variants.find(v => v.title === this.$route.params.variant)
					);
				}
				
				return products || [];
			}
		},
		methods: {
			chunkArray(myArray, chunk_size) {
				let index = 0;
				let arrayLength = myArray.length;
				let tempArray = [];
				
				for (index = 0; index < arrayLength; index += chunk_size) {
					let myChunk = myArray.slice(index, index + chunk_size);
					tempArray.push(myChunk);
				}
				
				return tempArray;
			},
			chunkHasLink(index) {
				// checks if a chunk has a link section
				// by the index of the chunk.
				// collection and filtered (variant) pages
				// don't have link sections.
				return ! this.isCollectionPage &&
					! this.isFilteredPage &&
					!! this.o(this.links[index]).href;
			},
			getProductLinkClassesByIndex(index) {
				return {
					'mr-4': (index % 2) - 1,
					'md:mr-4': (index % 5) - 4,
					'md:mr-0': (index % 5) - 5
				};
			}
		},
		metaInfo() {
			return {
				title: () => "products",
				meta: [
					{
						name: "description",
						content: "les solides is inspired by nature, the people and craftsmanship. all their products are produced locally in bali and their vision is to preserve the traditional craftsmanship and to build sustainable and personal relationships with their producers. anna z’brun sees her label as a counterpoint to mass consumption and fast pace, she relies on minimal and timeless design."
					}
				]
			};
		},
		async created() {
			this.$store.commit('updateLoading', true);
			
			/* Fetch images for main products page (first article) */
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
		height: calc((100vw - 2 * calc(20% - .8rem) - 4rem * 0.6482248996));
		@media screen and (min-width: $breakpoint-md) {
			height: calc((100vw - 2 * calc(20% - .8rem) - 4rem) * 0.6482248996);
		}
	}
	
	.aspect-width {
		@media screen and (min-width: $breakpoint-md) {
			width: calc(100vw - 2 * calc(20% - .8rem) - 4rem);
		}
	}
	
	.magnified h1 {
		font-size: 2rem;
	}
	
	.overlay {
		width: calc(100vw - 2rem);
	}
</style>