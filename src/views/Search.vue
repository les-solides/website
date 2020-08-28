<template>
	<div>
		
		<form @submit.prevent="find"
			  class="mb-8">
			<label for="query"
				   hidden></label>
			<input id="query"
				   placeholder="enter your search text here"
				   type="text"
				   v-model="search">
		</form>
		
		<div class="flex flex-wrap justify-between">
			<ProductLink :product="product"
						 :key="_.uniqueId(product.id)"
						 v-for="product of results" />
		</div>
	
	</div>
</template>

<script>
	import ProductLink from "../components/shop/ProductLink";
	
	export default {
		name: "Search",
		components: {ProductLink},
		data: () => ({
			results: [],
			search: ""
		}),
		methods: {
			async find() {
				this.$store.commit('updateLoading', true);
				this.results = await this.$store.dispatch(
					'shopify/product/search',
					this.search
				);
				this.wait(500);
				this.$store.commit('updateLoading', false);
			}
		}
	};
</script>

<style scoped
	   lang="scss">
	input {
		border: 1px solid;
		border-radius: 500px;
		padding: .5rem 1rem;
		width: 100%;
		font-size: 1.5rem;
		
		&::placeholder {
			color: gray;
		}
	}
</style>