<template>
	<div class="gif-loading"
		 style="background: #fbfbfb">
		<LoadedImage class="hidden md:block h-full object-contain w-full"
					 :src="selectedImage"
					 @load="loaded = true" />
		<LoadedImage class="block md:hidden mobile h-full object-contain object-top w-full"
					 :src="selectedImageMobile"
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
				"/assets/loading/lessolides_placeholder_desktop_loading_1.gif"
				/*"/assets/loading/lessolides_placeholder_desktop_loading_2.gif"*/
			],
			imagesMobile: [
				"/assets/loading/lessolides_placeholder_mobile_loading_1.gif"
				/*"/assets/loading/lessolides_placeholder_mobile_loading_2.gif"*/
			],
			loaded: false
		}),
		computed: {
			selectedImage() {
				return this.images[0];
			},
			selectedImageMobile() {
				return this.imagesMobile[0];
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