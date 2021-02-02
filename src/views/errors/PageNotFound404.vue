<template>
	<div></div>
</template>

<script>
	export default {
		name: "PageNotFound404",
		metaInfo: {
			title: "page not found",
			meta: [
				{
					name: "description",
					content: "the page you were looking for doesn't exist."
				}
			],
		},
		created() {
			this.$store.dispatch('goToNotFound');
		}
	};
</script>

<style scoped>

</style>