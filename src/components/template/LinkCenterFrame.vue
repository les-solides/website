<template>
	<div class="flex flex-wrap justify-center"
		 style="margin-bottom: var(--header-height)">
		<!-- Right [start] -->
		<a :href="image.alt"
		   class="flex items-center relative md:w-1/2 w-full"
		   v-if="image">
			<LoadedImage class="md:pl-2 w-full"
						 :class="{ darken: article.selectElement('#overlay').innerText }"
						 :src="image.src"
						 :alt="image.alt" />
			<span class="absolute h1 text-center text-white w-full">
				{{ article.selectElement("#overlay").innerText }}
			</span>
		</a>
		<!-- Right [end] -->
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "LinkCenterFrame",
		components: {LoadedImage},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		computed: {
			image() {
				return this.article?.images?.[0];
			}
		}
	};
</script>

<style scoped>

</style>