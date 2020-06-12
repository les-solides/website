<template>
	<header class="absolute bg-white h-full md:h-auto md:sticky md:p-4 top-0 transition-medium w-full"
			:class="{ 'top-100': !menuOpen }">
		<Burger @click.native="menuOpen = !menuOpen"
				class="bg-white bottom-0 fixed flex justify-center menu mobile p-2 w-full"
				:open="menuOpen" />
		<nav class="md:flex justify-between">
			<router-link class="block md:py-0 py-8"
						 to="/">
				les solides
			</router-link>
			<div class="md:flex">
				<router-link class="block md:py-0 px-4 py-4"
							 to="/products">
					products
				</router-link>
				<router-link class="block md:py-0 px-4 py-4"
							 to="/collaborations">
					collaborations
				</router-link>
				<router-link class="block md:py-0 px-4 py-4"
							 to="/lookbook">
					lookbook
				</router-link>
				<router-link class="block md:py-0 px-4 py-4"
							 to="/archive">
					archive
				</router-link>
				<router-link class="block md:py-0 px-4 py-4"
							 to="/search">
					search
				</router-link>
			</div>
			<div class="md:flex">
				<router-link class="block md:py-0 py-4"
							 to="/checkout">
					bag (0)
				</router-link>
			</div>
		</nav>
	</header>
</template>

<script>
	import Burger from "../partials/Burger";
	
	export default {
		name: "TheHeader",
		components: { Burger },
		data: () => ( {
			menuOpen: false
		} )
	};
</script>