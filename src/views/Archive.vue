<template>
	<div>
		<div :key="year"
			 v-for="year of years">
			<div class="bg-white md:pt-0 pt-4 sticky top-0 mb-4 md:top-100px w-full z-10">
				<h1 class="kapitälchen mb-1">{{ year }}</h1>
				<Divider />
			</div>
			<LinkProductGroup
					class="mb-4"
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
			await this.$store.commit('updateLoading', true);
			this.products = await this.$store.dispatch(
				'shopify/collection/fetchByHandle',
				'archive'
			);
			await this.$store.commit('updateLoading', false);
		}
	};
</script>

<style scoped>

</style>