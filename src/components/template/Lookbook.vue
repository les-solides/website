<template>
	<div style="margin-top: -1.1rem">
		<button style="line-height: 1.75" @click="open = ! open">{{ open ? 'v' : 'x' }} {{ article.title }}</button>
		<div class="horizontal-scroller flex justify-start"
			 :class="{ open }">
			<LoadedImage class="mr-4 object-contain object-top"
						 :src="image.src"
						 :key="image.src"
						 v-for="image of images" />
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
			height: calc(100vh - 12rem);
			
			img {
				height: calc(100vh - 12rem);
			}
			
			&.open {
				max-height: calc(100vh - 12rem);
			}
		}
	}
</style>