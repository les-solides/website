<template>
	<div>
		<div :key="year"
			 v-for="year of years">
			<h1>{{ year }}</h1>
			<Divider class="mt-2" />
			<LinkProductGroup
					class="mb-8 mt-8"
					:products="products.filter(product => product.getTag(/^archive:(.*)/, 'archive:') === year)"/>
		</div>
	</div>
</template>

<script>
	import Divider from "../components/partials/Divider";
	import LinkProductGroup from "../components/template/LinkProductGroup";
	export default {
		name: "Archive",
		components: {LinkProductGroup, Divider},
		data: () => ({
			products: []
		}),
		computed: {
			years() {
				return this._.uniq(this.products
						   .map(product => product.getTag(/^archive:(.*)/, 'archive:'))
						   .sort((a, b) => Number(b) - Number(a)));
			}
		},
		async created() {
			this.products = await this.$store.dispatch(
				'shopify/collection/fetchByHandle',
				'archive'
			);
		}
	};
</script>

<style scoped>

</style>