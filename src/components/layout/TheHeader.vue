<template>
	<header class="bg-white fixed h-full md:h-auto md:sticky md:p-default md:top-0
					md:z-0 text-center top-0 transition-medium w-full z-20"
			:class="{ 'top-100': !menuOpen }">
		
		<Burger @click.native="menuOpen = !menuOpen"
				class="bg-white bottom-0 fixed flex justify-center menu mobile p-2 shadow-inner w-full"
				:open="menuOpen" />
		
		<nav class="md:flex justify-between">
			<Route class="md:py-0 py-8"
				   to="/">
				les solides
			</Route>
			<div class="md:flex">
				<Route class="md:py-0 px-4 py-4"
					   to="/products">
					products
				</Route>
				<Route class="md:py-0 px-4 py-4"
					   to="/collaborations">
					collaborations
				</Route>
				<Route class="md:py-0 px-4 py-4"
					   to="/lookbook">
					lookbook
				</Route>
				<Route class="md:py-0 px-4 py-4"
					   to="/archive">
					archive
				</Route>
				<Route class="md:py-0 px-4 py-4"
					   to="/search">
					search
				</Route>
			</div>
			<div class="md:flex">
				<Route class="md:py-0 py-4"
					   to="/checkout">
					bag (0)
				</Route>
			</div>
		</nav>
	</header>
</template>

<script>
	import Burger from "../partials/Burger";
	import Route from "../partials/Route";
	
	export default {
		name: "TheHeader",
		components: {Route, Burger},
		data: () => ({
			menuOpen: false
		})
	};
</script>