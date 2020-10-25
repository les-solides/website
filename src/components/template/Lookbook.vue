<template>
	<div>
		<button class="flex items-center mb-1"
				@click="open = ! open">
			<img class="mr-2 mt-1"
				 src="/assets/chevron.jpeg"
				 style="width: 10px"
				 v-if=" ! open">
			<span class="block mr-2"
				  style="width: 10px;"
				  v-if="open">x</span>
			<span class="block">{{ article.title }}</span>
		</button>
		<div class="horizontal-scroller flex justify-start"
			 :class="{ open }">
			<LoadedImage class="object-contain object-top"
						 :class="{ 'mr-4': index < images.length - 1 }"
						 :src="image.src"
						 :key="image.src"
						 v-for="(image, index) of images" />
			<div style="height: 100%;min-width: 1rem;"></div>
		</div>
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "Lookbook",
		components: {LoadedImage},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		data: () => ({
			open: false
		}),
		computed: {
			images() {
				return this.article ? this.article.images || [] : [];
			},
			openOnStart() {
				return !! this.article.getTag(/open-on-start/);
			}
		},
		created() {
			this.open = this.openOnStart;
		}
	};
</script>

<style scoped
	   lang="scss">
	@import "./src/scss/partials/variables";
	
	.horizontal-scroller {
		height: 70vw;
		max-height: 0;
		overflow-y: hidden;
		position: relative;
		transition: .25s;
		width: calc(100% + 1rem);
		
		img {
			height: 70vw;
		}
		
		&.open {
			max-height: 70vw;
		}
		
		@media screen and (min-width: $breakpoint-md) {
			height: calc(100vh - 11rem);
			
			img {
				height: calc(100vh - 11rem);
				max-width: calc(100vh - 11rem);
			}
			
			&.open {
				max-height: calc(100vh - 11rem);
			}
		}
	}
</style>