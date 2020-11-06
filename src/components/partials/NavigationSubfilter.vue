<template>
	<div class="flex flex-wrap subfilter">
		<Route class="mr-1"
			   :class="{ 'text-gray-600': $route.params.variant !== 'bracelets' }"
			   to="/products/jewelry/bracelets">bracelets,
		</Route>
		<Route class="mr-1"
			   :class="{ 'text-gray-600': $route.params.variant !== 'cuffs' }"
			   to="/products/jewelry/cuffs">cuffs,
		</Route>
		<Route class="mr-1"
			   :class="{ 'text-gray-600': $route.params.variant !== 'earrings' }"
			   to="/products/jewelry/earrings">earrings,
		</Route>
		<Route class="mr-1"
			   :class="{ 'text-gray-600': $route.params.variant !== 'hoops' }"
			   to="/products/jewelry/hoops">hoops,
		</Route>
		<Route class="mr-1"
			   :class="{ 'text-gray-600': $route.params.variant !== 'necklaces' }"
			   to="/products/jewelry/necklaces">necklaces,
		</Route>
		<Route class="mr-1"
			   :class="{ 'text-gray-600': $route.params.variant !== 'rings' }"
			   to="/products/jewelry/rings">rings,
		</Route>
		<Route class="mr-1"
			   :class="{ 'text-gray-600': $route.params.variant !== 'add-ons' }"
			   to="/products/jewelry/add-ons">add-ons
		</Route>
	</div>
</template>

<script>
	import Route from "./Route";
	
	export default {
		name: "NavigationSubfilter",
		components: {Route}
	};
</script>

<style scoped
	   lang="scss">
	@import "./src/scss/partials/variables";
	
	.subfilter {
		background: white;
		left: 0;
		padding-bottom: 1rem;
		position: sticky;
		top: 3rem;
		width: 100%;
		z-index: 10;
		@media (min-width: $breakpoint-md) {
			padding: calc(1rem + var(--header-height)) 1rem 1rem;
			position: fixed;
			top: 0;
		}
	}
</style>