<template>
	<div>
		<button @click="open = ! open">x {{ article.title }}</button>
		<div class="horizontal-scroller flex justify-start"
			 :class="{ open }">
			<LoadedImage class="mr-4 object-contain"
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