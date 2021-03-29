<template>
	<header class="bg-white fixed h-full md:h-auto md:sticky md:p-default md:top-0
					text-center top-0 transition-medium w-full z-30"
			:class="{ 'top-100': ! menuOpen }">
		
		<div class="mobile-footer left-0 bg-white bottom-0 fixed flex justify-between menu mobile p-4 shadow-inner w-full z-10">
			<Burger @click.native="updateMenuOpen( ! menuOpen)"
					class="w-1/3"
					:open="menuOpen" />
			<div @click="openFooter(footer.routes.SEARCH)"
				 class="cursor-pointer p-0 px-2 w-1/3">
				search
			</div>
			<div class="flex justify-end w-1/3">
				<div class="cursor-pointer select-none z-10"
					 unselectable="on"
					 @click="checkoutOpen = ! checkoutOpen">
					cart ({{ amountOfCartItems }})
				</div>
				
				<div class="checkout-overview checkout-footer mt-2 shadow z-10"
					 :class="{ open: checkoutOpen }">
					<div class="loading-overlay h-full w-full"
						 v-if="loading"></div>
					<ul v-if=" ! amountOfCartItems">
						<li class="mb-4">your cart is empty</li>
					</ul>
					<ul class="mb-4 checkout-item-list"
						v-if="amountOfCartItems">
						<li class="flex mb-4"
							:key="item.id"
							v-for="item of $cart.items">
							<div style="width: 80px">
								<img :src="o(item.image).src"
									 :alt="o(item.image).alt" />
							</div>
							<div class="ml-4"
								 style="width: calc(100% - 80px - 1rem);">
								<div class="text-left">{{ item.title }}</div>
								<div class="flex mb-4">
									<span class="kapitälchen">
										{{ item.price.currencyCode }} {{ Number(item.price.amount).toFixed(2) }}
									</span>
								</div>
								<div class="flex justify-between text-left">
									<div class="mr-8 text-left"
										 v-if=" ! selectedLineItemForQuantityEdit || (selectedLineItemForQuantityEdit.id !== item.id)">
										quantity: {{ item.quantity }}
									</div>
									<input @change="updateQuantity(item, $event)"
										   class="mr-8 text-left"
										   style="border-bottom: 1px solid gray;width: 65px"
										   type="number"
										   :value="item.quantity"
										   v-if="selectedLineItemForQuantityEdit && (selectedLineItemForQuantityEdit.id === item.id)">
									<button @click="selectedLineItemForQuantityEdit = item">
										edit
									</button>
								</div>
							</div>
						</li>
					</ul>
					<div class="flex justify-between">
						<div class="text-left">total</div>
						<div class="kapitälchen">CHF {{ Number($cart.total).toFixed(2) }}</div>
					</div>
					<a class="checkout-button link mt-4"
					   :href="amountOfCartItems ? $cart.url : '/products'">
						{{ amountOfCartItems ? '( checkout )' : '( go to products )' }}
					</a>
				</div>
				
			</div>
		</div>
		
		<nav class="h-full md:flex justify-between">
			<div class="flex md:w-1/3">
				<Route class="bg-white fixed md:py-0 md:relative py-4 text-left top-0 md:w-auto w-full"
					   to="/home"
					   style="font-style: normal!important">
					les solides
				</Route>
				<NavigationFilter
						base="/products"
						class="hidden md:flex"
						name="Navigation (Products)"
						v-if="$route.path.includes('product')" />
			</div>
			<div class="md:flex justify-center md:w-1/3">
				<Route class="md:py-0 md:px-2 pb-6 pt-16 text-left"
					   :exact="false"
					   to="/products">
					products
				</Route>
				<!--<Route class="md:py-0 px-2 py-4"
					   to="/collaborations">
					collaborations
				</Route>-->
				<!--<Route class="md:py-0 px-2 py-4"
					   to="/lookbook">
					lookbook
				</Route>-->
				<Route class="md:py-0 pb-6 md:px-2 text-left"
					   to="/archive">
					archive
				</Route>
				<div @click="openFooter(footer.routes.SEARCH)"
					 class="cursor-pointer hidden md:block md:py-0 px-2 py-4">
					search
				</div>
				<TheFooter class="block md:bottom-0 md:hidden mt-16 md:relative z-0" />
			</div>
			<div class="cursor-pointer hidden md:flex justify-end md:w-1/3 select-none z-20"
				 unselectable="on"
				 @click="checkoutOpen = ! checkoutOpen">
				<div class="md:py-0 py-4"
					 v-if=" ! checkoutOpen">
					cart ({{ amountOfCartItems }})
				</div>
				<div class="md:py-0 py-4"
					 v-if="checkoutOpen">
					<Cross />
				</div>
			</div>
			<transition name="fade">
				<div class="checkout-overview mt-2 open shadow z-10"
					 v-show="checkoutOpen">
					<div class="loading-overlay h-full w-full"
						 v-if="loading"></div>
					<ul v-if=" ! amountOfCartItems">
						<li class="mb-4">your cart is empty</li>
					</ul>
					<ul class="mb-4 checkout-item-list"
						v-if="amountOfCartItems">
						<li class="flex mb-4"
							:key="item.id"
							style="min-width: calc(18vw)"
							v-for="item of $cart.items">
							<div style="width: 80px">
								<img :src="o(item.image).src"
									 :alt="o(item.image).alt" />
							</div>
							<div class="ml-4"
								 style="width: calc(100% - 80px - 1rem);">
								<div class="text-left">{{ item.title }}</div>
								<div class="flex mb-4">
									<span class="kapitälchen">{{ item.price.currencyCode }} {{ Number(item.price.amount).toFixed(2) }}</span>
								</div>
								<div class="flex justify-between text-left">
									<div class="text-left"
										 v-if=" ! selectedLineItemForQuantityEdit || (selectedLineItemForQuantityEdit.id !== item.id)">
										quantity: {{ item.quantity }}
									</div>
									<input @change="updateQuantity(item, $event)"
										   class="text-left"
										   style="border-bottom: 1px solid gray;width: 65px"
										   type="number"
										   :value="item.quantity"
										   v-if="selectedLineItemForQuantityEdit && (selectedLineItemForQuantityEdit.id === item.id)">
									<button @click="selectedLineItemForQuantityEdit = item">
										edit
									</button>
								</div>
							</div>
						</li>
					</ul>
					<div class="flex justify-between">
						<div class="text-left">total</div>
						<div class="kapitälchen">CHF {{ Number($cart.total).toFixed(2) }}</div>
					</div>
					<a class="checkout-button link mt-4"
					   :href="amountOfCartItems ? $cart.url : '/products'">
						{{ amountOfCartItems ? '( checkout )' : '( go to products )' }}
					</a>
				</div>
			</transition>
		</nav>
	</header>
</template>

<script>
	import Burger from "../partials/Burger";
	import Route from "../partials/Route";
	import NavigationFilter from "../partials/NavigationFilter";
	import { mapGetters } from "vuex";
	import TheFooter from "./TheFooter";
	import Cross from "../partials/Cross";
	import store from './../../store/index';
	import Footer from "../../modules/Footer";
	
	let timeout = null;
	
	export default {
		name: "TheHeader",
		components: {Cross, TheFooter, NavigationFilter, Route, Burger},
		data: () => ({
			footer: Footer,
			loading: false,
			selectedLineItemForQuantityEdit: null
		}),
		computed: {
			...mapGetters(['bagIsOpen', 'menuOpen']),
			amountOfCartItems() { // new
				return this.$cart.length;
			},
			checkoutOpen: {
				get() {
					return this.bagIsOpen;
				},
				set(value) {
					this.$store.commit('updateBagOpen', value);
				}
			},
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
			},
			async updateQuantity(item, {target}) {
				this.loading = true;
				if (Number(target?.value) === 0) {
					await this.$cart.remove(item);
					this.selectedLineItemForQuantityEdit = null;
					return this.loading = false;
				}
				await this.$cart.updateQuantity(item, Number(target?.value) || 1);
				this.selectedLineItemForQuantityEdit = null;
				this.loading = false;
			},
			updateMenuOpen(value) {
				this.$store.commit('updateMenuOpen', value);
			}
		},
		watch: {
			amountOfCartItems() {
				if ( ! store.getters['bagIsOpen']) {
					clearTimeout(timeout);
					timeout = setTimeout(
						() => this.$store.commit('updateBagOpen', false),
						3000
					);
				}
				this.$store.commit('updateBagOpen', true);
			}
		}
	};
</script>

<style lang="scss">
	@import "./src/scss/partials/variables";
	
	.mobile-footer {
		height: 72px;
		@media screen and (min-width: $breakpoint-md) {
			height: var(--footer-height);
		}
		
		.comp__burger {
			height: 20px;
		}
	}
</style>