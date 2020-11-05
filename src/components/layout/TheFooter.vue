<template>
	<footer class="bg-white"
			:class="{ 'z-30': open }">
		<article class="bg-white fixed md:z-30 md:px-4 pb-16 overflow-auto transition-medium text-left"
				 :class="{ 'top-100': ! open }">
			<Burger @click.native="closeFooter"
					class="fixed mr-4 right"
					:open="true" />
			
			<About page="page:about" v-if="currentRoute === footer.routes.ABOUT" />
			<TermsOfUse v-if="currentRoute === footer.routes.TERMS" />
			<Contact v-if="currentRoute === footer.routes.CONTACT" />
			<SizeGuide v-if="currentRoute === footer.routes.SIZE" />
			<NewsletterSignup v-if="currentRoute === footer.routes.NEWSLETTER" />
			<PrivacyPolicy v-if="currentRoute === footer.routes.PRIVACY" />
			<ReturnsAndExchanges v-if="currentRoute === footer.routes.RETURNS" />
			<Shipping v-if="currentRoute === footer.routes.SHIPPING" />
			<!--<Stockist v-if="currentRoute === footer.routes.STOCKISTS" />-->
			<About page="page:care-instructions" v-if="currentRoute === footer.routes.CARE" />
		</article>
		
		<div class="bg-white border-top md:flex mx-4 text-left z-50"
			 style="padding: .870rem 0 0.870rem 0 !important;">
			<button @click="openFooter(footer.routes.ABOUT)"
					class="margin-deduct-4 mb-4 md:mb-0 mr-4">about
			</button>
			<button @click="openFooter(footer.routes.TERMS)"
					class="margin-deduct-4 mb-4 md:mb-0 mr-4">terms of use
			</button>
			<button @click="openFooter(footer.routes.PRIVACY)"
					class="margin-deduct-4 mb-4 md:mb-0 mr-4">privacy policy
			</button>
			<!--<button @click="openFooter(footer.routes.COOKIE)"
					class="mrmargin-deduct-4 -4">cookie policy
			</button>-->
			<button @click="openFooter(footer.routes.SHIPPING)"
					class="margin-deduct-4 mb-4 md:mb-0 mr-4">shipping
			</button>
			<button @click="openFooter(footer.routes.RETURNS)"
					class="margin-deduct-4 mb-4 md:mb-0 mr-4">returns and exchange
			</button>
			<button @click="openFooter(footer.routes.NEWSLETTER)"
					class="margin-deduct-4 mb-4 md:mb-0 mr-4">newsletter signup
			</button>
			<button @click="openFooter(footer.routes.CONTACT)"
					class="margin-deduct-4 mb-4 md:mb-0 mr-4">contact
			</button>
			<!--<button @click="openFooter(footer.routes.STOCKISTS)"
					class="margin-deduct-4 mb-4 md:mb-0 mr-4">stockist
			</button>-->
			<button @click="openFooter(footer.routes.SIZE)"
					class="margin-deduct-4 mr-4">size guide
			</button>
			<button @click="openFooter(footer.routes.CARE)"
					class="margin-deduct-4 mr-4">care instructions
			</button>
			<!--<button @click="openFooter(footer.routes.PRESS)"
					class="mrmargin-deduct-4 -4">press
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
	import Contact from "../template/Contact";
	
	export default {
		name: "TheFooter",
		components: {
			Contact,
			NewsletterSignup,
			ReturnsAndExchanges, Shipping, PrivacyPolicy, SizeGuide, TermsOfUse, About, Burger
		},
		data: () => ({
			footer: Footer
		}),
		computed: {
			currentRoute() {
				return this.$store.getters['footerRoute'];
			},
			open() {
				return this.$store.getters['footerIsOpen'];
			}
		},
		methods: {
			closeFooter() {
				this.$store.commit('updateFooterOpen', false);
			},
			openFooter(route) {
				if (
					this.open &&
					this.currentRoute === route
				) {
					return this.closeFooter();
				}
				this.$store.commit('updateFooterRoute', route);
				return this.$store.commit('updateFooterOpen', true);
			}
		}
	};
</script>

<style lang="scss">
	@import "./src/scss/partials/variables";
	
	article {
		height: calc(100vh - 4.5rem);
		opacity: .85;
		padding-top: .75rem;
		padding-bottom: var(--footer-height);
		top: 0;
		width: calc(100% - 2rem);
		h1, h2, h3, p, a, ul, li, td {
			font-size: 1.75rem;
			@media screen and (min-width: $breakpoint-md) {
				font-size: 2.15rem;
			}
		}
		table {
			margin-bottom: 3rem;
		}
		li {
			list-style: inside;
		}
		@media screen and (min-width: $breakpoint-md) {
			height: calc(100vh - 2.5rem);
			top: var(--header-height);
			width: 100%;
		}
	}
	
	footer {
		bottom: 72px;
		line-height: 1;
		position: absolute;
		top: unset;
		z-index: 30;
		h1, p, h2, ul, li {
			line-height: 1;
			text-transform: lowercase;
		}
		@media screen and (min-width: $breakpoint-md) {
			bottom: 0;
			position: relative;
		}
	}
</style>