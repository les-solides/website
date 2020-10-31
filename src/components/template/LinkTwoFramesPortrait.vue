<template>
	<div class="flex flex-wrap justify-center md:flex-no-wrap"
		 style="margin-bottom: var(--header-height);">
		<!-- Left [start] -->
		<a :href="leftImage.alt"
		   class="aspect-height aspect-width flex items-center relative mb-4 md:mb-0 md:mr-2 w-full"
		   v-if="leftImage">
			<LoadedImage class="h-full object-cover w-full"
						 :class="{ darken: article.selectElement('#overlay-left').innerText }"
						 :src="leftImage.src"
						 :alt="leftImage.alt" />
			<span class="absolute h1 text-center text-white w-full">
				{{ article.selectElement("#overlay-left").innerText }}
			</span>
		</a>
		<!-- Left [end] -->
		
		<!-- Right [start] -->
		<a :href="rightImage.alt"
		   class="aspect-height aspect-width flex items-center relative md:ml-2 w-full"
		   v-if="rightImage">
			<LoadedImage class="h-full object-cover w-full"
						 :class="{ darken: article.selectElement('#overlay-right').innerText }"
						 :src="rightImage.src"
						 :alt="rightImage.alt" />
			<span class="absolute h1 text-center text-white w-full">
				{{ article.selectElement("#overlay-right").innerText }}
			</span>
		</a>
		<!-- Right [end] -->
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "LinkTwoFramesPortrait",
		components: {LoadedImage},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		computed: {
			leftImage() {
				if ( ! this.article.images.length) {
					return null;
				}
				return this.article.images[0];
			},
			rightImage() {
				if ( ! this.article.images.length) {
					return null;
				}
				return this.article.images[1];
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "./../../../src/scss/partials/variables";
	
	.aspect-height {
		height: calc((100vw) * 0.6482248996 * 2);
		@media screen and (min-width: $breakpoint-md) {
			height: calc((50vw - 1.5rem));
		}
	}
	.aspect-width {
		@media screen and (min-width: $breakpoint-md) {
			width: calc((50vw - 1rem) * 0.6482248996);
		}
	}
	
</style>