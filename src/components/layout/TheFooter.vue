<template>
	<footer class="bg-white z-10">
		<article class="bg-white fixed p-4 transition-medium w-full"
				 :class="{ 'top-0': open, 'top-100': !open }">
			<Burger @click.native="closeFooter"
					class="fixed mr-4 right"
					:open="true" />
			
			<About v-if="currentRoute === footer.routes.ABOUT" />
		</article>
		
		<div class="border-top md:flex mx-4 py-4">
			<button @click="openFooter(footer.routes.ABOUT)"
					class="mr-4">about
			</button>
			<button @click="openFooter(footer.routes.TERMS)"
					class="mr-4">terms of use
			</button>
			<button @click="openFooter(footer.routes.PRIVACY)"
					class="mr-4">privacy policy
			</button>
			<button @click="openFooter(footer.routes.COOKIE)"
					class="mr-4">cookie policy
			</button>
			<button @click="openFooter(footer.routes.SHIPPING)"
					class="mr-4">shipping
			</button>
			<button @click="openFooter(footer.routes.RETURNS)"
					class="mr-4">returns and exchange
			</button>
			<button @click="openFooter(footer.routes.NEWSLETTER)"
					class="mr-4">newsletter signup
			</button>
			<button @click="openFooter(footer.routes.CONTACT)"
					class="mr-4">contact
			</button>
			<button @click="openFooter(footer.routes.STOCKISTS)"
					class="mr-4">stockist
			</button>
			<button @click="openFooter(footer.routes.SIZE)"
					class="mr-4">size guide
			</button>
			<button @click="openFooter(footer.routes.PRESS)"
					class="mr-4">press
			</button>
		</div>
	</footer>
</template>

<script>
	import Burger from "../partials/Burger";
	import Footer from "../../modules/Footer";
	import About from "../../views/footer/About";
	
	export default {
		name: "TheFooter",
		components: {About, Burger},
		data: () => ({
			currentRoute: null,
			footer: Footer,
			open: false
		}),
		methods: {
			closeFooter() {
				this.open = false;
			},
			openFooter(route) {
				if (
					this.open &&
					this.currentRoute === route
				) {
					return this.closeFooter();
				}
				this.currentRoute = route;
				return this.open = true;
			}
		}
	};
</script>

<style scoped>
	article {
		height: calc(100vh - var(--footer-height));
	}
</style>