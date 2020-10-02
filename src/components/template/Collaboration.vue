<template>
	<div :id="article.handle"
		 class="collaboration mt-4 md:mt-0">
		<button
			@click="activeImageIndex >= imageCount - 1 ? (activeImageIndex = 0) : activeImageIndex++"
			class="inner">
			<LoadedImage
					class="mr-4 object-contain"
					:key="o(activeImage).src || o(activeImage).transformedSrc"
					:src="o(activeImage).src || o(activeImage).transformedSrc" />
			<div class="flex justify-between md:ml-1/3 md:w-2/3 w-full">
				<div>
					<div>{{ o(product).title }}</div>
					<div class="text-left kapitälchen">{{ o(product).price }}</div>
				</div>
				<router-link :to="productRoute">go to product</router-link>
			</div>
		</button>
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
			activeImageIndex: 0,
			product: null
		}),
		computed: {
			activeImage() {
				return this.images?.[this.activeImageIndex];
			},
			imageCount() {
				return this.images?.length || 0;
			},
			images() {
				return [
					this.article?.featuredImage,
					...this.article?.images
				].filter(i => i);
			},
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
<style lang="scss">
	.collaboration {
		width: 100%;
	}
	.inner {
		height: calc(100vh - 12rem);
		width: 100%;
		
		img {
			height: 100%;
			object-fit: cover;
			width: 100%;
		}
	}
</style>