<template>
	<div class="flex subfilter">
		<Route class="mr-1" to="/products/jewelry/bracelets">bracelets, </Route>
		<Route class="mr-1" to="/products/jewelry/cuffs">cuffs, </Route>
		<Route class="mr-1" to="/products/jewelry/earrings">earrings, </Route>
		<Route class="mr-1" to="/products/jewelry/hoops">hoops, </Route>
		<Route class="mr-1" to="/products/jewelry/necklaces">necklaces, </Route>
		<Route class="mr-1" to="/products/jewelry/rings">rings</Route>
	</div>
</template>

<script>
	import Route from "./Route";
	export default {
		name: "NavigationSubfilter",
		components: {Route}
	};
</script>

<style scoped lang="scss">
@import "./src/scss/partials/variables";
.subfilter {
	background: white;
	left: 0;
	padding: 0 1rem 1rem 0;
	position: sticky;
	top: 3rem;
	width: 100%;
	z-index: 10;
	@media (min-width: $breakpoint-md) {
		padding: 0 1rem 1rem;
		position: fixed;
		top: var(--header-height);
	}
}
</style>