<template>
	<div class="flex flex-wrap justify-between mb-12">
		<!-- Left [start] -->
		<a :href="leftImage.alt"
		   class="flex items-center relative mb-4 md:mb-0 md:w-1/2 w-full"
		   v-if="leftImage">
			<LoadedImage class="md:pr-2 w-full"
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
		   class="flex items-center relative md:w-1/2 w-full"
		   v-if="rightImage">
			<LoadedImage class="md:pl-2 w-full"
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
		name: "LinkTwoFrames",
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

<style scoped>

</style>