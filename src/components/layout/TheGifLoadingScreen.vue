<template>
	<div class="gif-loading">
		<LoadedImage class="h-full object-cover"
					 :src="selectedImage"
					 @load="loaded = true" />
	</div>
</template>

<script>
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "TheGifLoadingScreen",
		components: {LoadedImage},
		data: () => ({
			images: [
				"/assets/loading/lessolides_placeholder_loading_1.gif",
				"/assets/loading/lessolides_placeholder_loading_3.gif",
				"/assets/loading/lessolides_placeholder_loading_4.gif",
				"/assets/loading/lessolides_placeholder_loading_5.gif",
				"/assets/loading/lessolides_placeholder_loading_6.gif",
				"/assets/loading/lessolides_placeholder_loading_7.gif",
				"/assets/loading/lessolides_placeholder_loading_8.gif"
			],
			loaded: false
		}),
		computed: {
			selectedImage() {
				return this.images[Math.floor(Math.random() * this.images.length)];
			}
		}
	};
</script>

<style scoped
	   lang="scss">
	.gif-loading {
		height: 100vh;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 200;
	}
</style>