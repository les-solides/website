<template>
	<div class="bg-white fixed flex h-screen items-center justify-center left-0 top-0 w-screen z-40"
		 v-if="active">
		<div>
			<h1>les solides</h1>
			<InfiniteLoader class="mx-auto"
							width="70px" />
		</div>
	</div>
</template>

<script>
	import InfiniteLoader from "../partials/InfiniteLoader";
	
	export default {
		name: "TheLoadingScreen",
		components: {InfiniteLoader},
		props: {
			active: {
				type: Boolean,
				required: true
			}
		}
	};
</script>

<style scoped>

</style>