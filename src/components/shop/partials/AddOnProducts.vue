<template>
	<div v-if="addOns.length">
		<span class="block mb-3 md:text-center w-full">add ons</span>
		
		<ul class="flex overflow-x-auto">
			<ProductLink
					:add-on-reference="product"
					:class="{
						'mr-4': true,
						'md:mr-4': (index % 5) - 4,
						'md:mr-0': (index % 5) - 5
					 }"
					:is-add-on="true"
					:key="addOn.id"
					:product="addOn"
					v-for="(addOn, index) of addOns" />
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
			product: {
				type: Product,
				required: true
			}
		},
		computed: {
			addOns() {
				return this.product.getAddOns() || [];
			}
		}
	};
</script>