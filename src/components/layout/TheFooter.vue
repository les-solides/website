<template>
	<footer class="bg-white sticky" :class="{ 'bottom-0 z-20': open }">
		<article class="bg-white fixed md:z-30 p-4 overflow-auto transition-medium w-full"
				 :class="{ 'top-0': open, 'top-100': !open }">
			<Burger @click.native="closeFooter"
					class="fixed mr-4 right"
					:open="true" />
			
			<About v-if="currentRoute === footer.routes.ABOUT" />
			<SizeGuide v-if="currentRoute === footer.routes.SIZE" />
			<NewsletterSignup v-if="currentRoute === footer.routes.NEWSLETTER" />
			<PrivacyPolicy v-if="currentRoute === footer.routes.PRIVACY" />
			<ReturnsAndExchanges v-if="currentRoute === footer.routes.RETURNS" />
			<Shipping v-if="currentRoute === footer.routes.SHIPPING" />
			<Stockist v-if="currentRoute === footer.routes.STOCKISTS" />
			<TermsOfUse v-if="currentRoute === footer.routes.TERMS" />
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
			<!--<button @click="openFooter(footer.routes.COOKIE)"
					class="mr-4">cookie policy
			</button>-->
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
			<!--<button @click="openFooter(footer.routes.PRESS)"
					class="mr-4">press
			</button>-->
		</div>
	</footer>
</template>

<script>
	import Burger from "../partials/Burger";
	import Footer from "../../modules/Footer";
	import About from "../../views/footer/About";
	import TermsOfUse from "../../views/footer/TermsOfUse";
	import SizeGuide from "../../views/footer/SizeGuide";
	import PrivacyPolicy from "../../views/footer/PrivacyPolicy";
	import Shipping from "../../views/footer/Shipping";
	import ReturnsAndExchanges from "../../views/footer/ReturnsAndExchanges";
	import NewsletterSignup from "../../views/footer/NewsletterSignup";
	import Stockist from "../../views/footer/Stockist";
	
	export default {
		name: "TheFooter",
		components: {
			Stockist,
			NewsletterSignup,
			ReturnsAndExchanges, Shipping, PrivacyPolicy, SizeGuide, TermsOfUse, About, Burger},
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

<style lang="scss">
	article {
		height: calc(100vh - var(--footer-height));
		padding-bottom: var(--footer-height);
		.footer-page h2 {
			margin-top: 1rem!important;
		}
	}
</style>