<template>
	<div :id="article.handle"
		 class="collaboration mx-auto" v-if="products.length">
		<div class="horizontal-scroller flex justify-start mt-4 open">
			<LoadedImage :src="product.image.transformedSrc"/>
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
		computed: {
			products() {
				return this.article.products || [];
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "./src/scss/partials/variables";
	.horizontal-scroller {
		height: 70vw;
		max-height: 0;
		overflow-y: hidden;
		transition: .25s;
		
		img {
			height: 70vw;
		}
		
		&.open {
			max-height: 70vw;
		}
		
		@media screen and (min-width: $breakpoint-md) {
			height: 40vw;
			
			img {
				height: 40vw;
			}
			
			&.open {
				max-height: 40vw;
			}
		}
	}
</style>