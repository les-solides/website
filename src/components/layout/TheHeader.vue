<template>
	<nav class="flex">
		<router-link to="/">les solides</router-link>
		<div class="flex">
			<router-link to="/products">products</router-link>
			<router-link to="/collaborations">collaborations</router-link>
			<router-link to="/lookbook">lookbook</router-link>
			<router-link to="/archive">archive</router-link>
			<router-link to="/search">search</router-link>
		</div>
		<div class="flex"></div>
	</nav>
</template>

<script>
	export default {
		name: "TheHeader"
	};
</script>

<style scoped>

</style>