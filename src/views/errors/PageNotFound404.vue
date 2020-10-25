<template>
	<div></div>
</template>

<script>
	export default {
		name: "PageNotFound404",
		created() {
			this.$store.dispatch('goToNotFound');
		}
	};
</script>

<style scoped>

</style>