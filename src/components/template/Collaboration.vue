<template>
	<div :id="article.handle"
		 class="collaboration mt-4 md:mt-0">
		<div class="horizontal-scroller	flex justify-start open">
			<router-link
					class="initial-product  mr-4"
					:to="productRoute">
				<LoadedImage
						:src="article.featuredImage.originalSrc"
						v-if="article.featuredImage" />
				<div class="flex justify-between">
					<div>{{ o(product).title }}</div>
					<div class="kapitälchen">{{ o(product).price }}</div>
				</div>
			</router-link>
			<div class="collaboration-images items-baseline object-contain flex">
				<LoadedImage
						class="mr-4 object-contain"
						:key="image.src"
						v-for="image of article.images"
						:src="image.src" />
			</div>
			
		
		</div>
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "Collaboration",
		components: {LoadedImage},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		data: () => ({
			product: null
		}),
		computed: {
			productHandle() {
				return this.article.getTag(/product:*/, /product:*/);
			},
			productRoute() {
				return this.o(this.product).handle ?
					   `/product/${ this.product.handle }` :
					   '';
			}
		},
		async created() {
			this.product = await this.$store.dispatch(
				'shopify/product/fetchByHandle',
				this.productHandle
			);
		}
	};
</script>

<style scoped
	   lang="scss">
	@import "./src/scss/partials/variables";
	
	$height: 85vh;
	
	.collaboration {
		left: -1rem;
		position: relative;
		width: calc(100vw);
		
		.collaboration-images {
			img {
				height: calc(#{$height} - 20vh);
				max-width: unset;
				@media screen and (min-width: $breakpoint-md){
					height: $height;
				}
			}
		}
		
		.horizontal-scroller {
			overflow-y: scroll;
			width: 100vw;
		}
		
		.initial-product {
			display: block;
			margin-left: 1rem;
			max-width: calc(100vw - 4rem);
			min-width: calc(100vw - 4rem);
			@media screen and (min-width: $breakpoint-md){
				margin-left: calc(50vw - 16vw);
				max-width: 30vw;
				min-width: 30vw;
			}
			
			img {
				height: calc(#{$height} - 20vh);
				object-fit: cover;
				width: 100%;
				@media screen and (min-width: $breakpoint-md){
					height: $height;
				}
			}
		}
	}
</style>