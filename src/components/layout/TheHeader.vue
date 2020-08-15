<template>
	<header class="bg-white fixed h-full md:h-auto md:sticky md:p-default md:top-0
					text-center top-0 transition-medium w-full z-20"
			:class="{ 'top-100': ! menuOpen }">
		
		<Burger @click.native="updateMenuOpen( ! menuOpen)"
				class="bg-white bottom-0 fixed flex justify-center menu mobile p-2 shadow-inner w-full"
				:open="menuOpen" />
		
		<nav class="md:flex justify-between">
			<div class="flex md:w-1/3">
				<Route class="md:py-0 md:text-left md:w-auto py-8 text-center w-full"
					   to="/home">
					les solides
				</Route>
				<NavigationFilter base="/products"
								  name="Navigation (Products)"
								  v-if="$route.path.includes('product')" />
			</div>
			<div class="md:flex justify-between md:w-1/3">
				<Route class="md:py-0 px-4 py-4"
					   :exact="false"
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
			<div class="md:flex justify-end md:w-1/3">
				<a class="md:py-0 py-4"
				   :href="$cart.url"
				   target="_blank">
					bag ({{ amountOfCartItems }})
				</a>
			</div>
		</nav>
	</header>
</template>

<script>
	import Burger from "../partials/Burger";
	import Route from "../partials/Route";
	import NavigationFilter from "../partials/NavigationFilter";
	import { mapGetters } from "vuex";
	
	export default {
		name: "TheHeader",
		components: {NavigationFilter, Route, Burger},
		computed: {
			...mapGetters(['menuOpen']),
			amountOfCartItems() { // new
				return this.$cart.length;
			}
		},
		methods: {
			updateMenuOpen(value) {
				this.$store.commit('updateMenuOpen', value);
			}
		}
	};
</script>