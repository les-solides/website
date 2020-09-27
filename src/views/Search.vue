<template>
	<div>
		
		<form @submit.prevent="find"
			  class="bg-white search-bar mb-8 pt-4 md:pt-0 sticky z-10">
			<label for="query"
				   hidden></label>
			<input id="query"
				   placeholder="enter your search text here"
				   type="text"
				   v-model="search">
			<div class="py-4">
				<!--:class="{ selected: search === suggestion.innerText }"-->
				<button class="mr-2 suggestion"
						:key="suggestion.innerText"
						@click="search = suggestion.innerText"
						v-for="suggestion of suggestions">
					{{ suggestion.innerText }}
				</button>
			</div>
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
			search: "",
			suggestions: []
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
		},
		async mounted() {
			const article = await this.$store.dispatch(
				'shopify/blog/fetchFirstArticleByTags',
				['page:suchbegriffe']
			);
			const root = document.createElement('div');
			root.innerHTML = article.contentHtml || "";
			console.log({root, article});
			this.suggestions = Array.from(
				root.querySelectorAll('li')
			) || [];
		}
	};
</script>

<style scoped
	   lang="scss">
	button.suggestion {
		border: 1px solid;
		border-radius: 300px;
		padding: .25rem 1rem;
		
		&.selected {
			background: black;
			color: white;
		}
	}
	
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
	
	.search-bar {
		top: 0;
		@media (min-width: 768px) {
			top: var(--header-height);
		}
	}
</style>