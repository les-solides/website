<template>
	<div>
		<div :key="year"
			 :style="'margin-top: calc(-1rem - 8px)'"
			 v-for="(year, index) of years">
			<div class="bg-white md:pt-0 pt-4 sticky top-4 md:top-0 mb-4 md:top-100px w-full z-10">
				<h5 class="kapitälchen mb-1">{{ year }}</h5>
				<Divider />
			</div>
			<LinkProductGroup
					class="mb-4"
					:style="`align-content: baseline; ${ index === years.length - 1 ? ' min-height: calc(100vh - 10gsrem)' : ''}`"
					:products="products.filter(product => product.getTag(/^archive:(.*)/, 'archive:') === year)" />
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
		metaInfo: {
			title: 'archive',
			meta: [
				{
					name: "description",
					content: "many of our products are no longer available, but we would still like to show you what we have offered in the past. visit our archive to learn more about the history of les solides."
				}
			]
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