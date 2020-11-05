<template>
	<div class="flex flex-wrap justify-center"
		 style="margin-bottom: var(--header-height)">
		<div class="md:w-1/2 w-full">
			<div class="flex items-center relative"
			   v-if="video">
				<div v-html="video" />
			</div>
		</div>
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "VideoCenterFrame",
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		computed: {
			articleOverlay() {
				return this.article.selectElement("#overlay").outerHTML;
			},
			image() {
				return this.article?.images?.[0];
			},
			content() {
				return this.article.selectElement('[data-link]');
			},
			link() {
				return this.content?.dataset?.link || "";
			},
			video() {
				return this.article?.videos?.[0];
			}
		}
	};
</script>

<style scoped>
.overlay {
	left: 50%;
	min-width: calc(100vw - 2rem);
	transform: translateX(-50%);
	width: calc(100vw - 2rem);
}
</style>