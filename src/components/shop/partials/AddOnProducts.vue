<template>
	<div v-if="addOnHandles.length">
		<span class="block mb-3 md:text-center w-full">add ons</span>
		
		<ul class="flex overflow-x-auto">
			<ProductLink
					:class="{
						'mr-4': (index % 2) - 1,
						'md:mr-4': (index % 5) - 4,
						'md:mr-0': (index % 5) - 5
					 }"
					:key="o(getProductByHandle(handle)).id"
					:product="getProductByHandle(handle)"
					v-for="(handle, index) of addOnHandles" />
		</ul>
	</div>
</template>

<script>
	import Product from "../../../modules/shopify/Product";
	import ProductLink from "../ProductLink";
	
	export default {
		name: "AddOnProducts",
		components: {ProductLink},
		props: {
			mobile: {
				type: Boolean,
				default() {
					return false;
				}
			},
			product: {
				type: Product,
				required: true
			}
		},
		computed: {
			addOnHandles() {
				return Array.from(this.product.selectElements('[data-add-on]') || [])
					.map(addOn => addOn.dataset.addOn);
			}
		},
		methods: {
			getProductByHandle(handle) {
				return this.$store.getters['shopify/product/allProducts']
					.find(p => p.handle === handle);
			}
		}
	};
</script>

<style scoped>

</style>