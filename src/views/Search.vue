<template>
	<div class="search-page">
		<!--<Cross @click="$router.go(-1)"
			   class="absolute"
			   style="top: calc(1rem + var(&#45;&#45;header-height));right: 1.5rem;" />-->
		<form class="bg-white search-bar mt-16 md:mt-0 sticky z-10">
			<label for="query"
				   hidden></label>
			<input id="query"
				   @keypress="find"
				   placeholder="enter your search text here"
				   type="text"
				   v-model="search">
			<div class="flex flex-wrap justify-center py-4">
				<!--:class="{ selected: search === suggestion.innerText }"-->
				<button class="suggestion"
						:key="suggestion.innerText"
						@click.prevent="search = suggestion.innerText"
						v-for="suggestion of suggestions">
					{{ suggestion.innerText }}
				</button>
			</div>
		</form>
		
		<div class="ml-4"
			 v-if="loaded && ! results.length">
			no products found...
		</div>
		
		<div class="flex flex-wrap"
			 v-if="search">
			<ProductLink
					:class="{
						'mr-4': (index % 2) - 1,
						'md:mr-4': (index % 5) - 4,
						'md:mr-0': (index % 5) - 5
					 }"
					:product="product"
					:key="_.uniqueId(product.id)"
					v-for="(product, index) of results" />
		</div>
	
	</div>
</template>

<script>
	import ProductLink from "../components/shop/ProductLink";
	import { debounce, lowerCase } from "lodash";
	
	export default {
		name: "Search",
		components: {ProductLink},
		data: () => ({
			loaded: false,
			/*results: [],*/
			search: "",
			suggestions: []
		}),
		computed: {
			results() {
				return this.$store.getters['shopify/product/allProducts'].filter(p =>
					p.title.includes(this.searchLowercase) ||
					p.handle.includes(this.searchLowercase) ||
					p.collections.find(c => c.title.includes(this.searchLowercase)) ||
					p.tags.find(t => t.includes(this.searchLowercase)) ||
					p.productType.includes(this.searchLowercase)
				);
			},
			searchLowercase() {
				return lowerCase(this.search);
			}
		},
		methods: {
			find: debounce(async function () {
				/*this.false = false;
				 this.$store.commit('updateLoading', true);
				 /!*this.results = await this.$store.dispatch(
				 'shopify/product/search',
				 this.search
				 );*!/
				 this.wait(500);
				 this.$store.commit('updateLoading', false);
				 this.loaded = true;*/
			}, 500)
		},
		metaInfo: {
			title: "search",
			meta: [
				{
					name: "description",
					content: "can't find what you were looking for. try out our search and hopefully it will help you find just what you need."
				}
			],
		},
		async mounted() {
			const article = await this.$store.dispatch(
				'shopify/blog/fetchFirstArticleByTags',
				['page:suchbegriffe']
			);
			const root = document.createElement('div');
			root.innerHTML = article.contentHtml || "";
			this.suggestions = Array.from(
				root.querySelectorAll('li')
			) || [];
		}
	};
</script>

<style scoped
	   lang="scss">
	.search-page {
		min-height: calc(100vh - var(--header-height) - var(--footer-height) - 3rem - 4px);
	}
	
	button.suggestion {
		// border: 1px solid;
		border-radius: 300px;
		padding: .25rem .5rem;
		
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
		/*@media (min-width: 1024px) {
			top: var(--header-height);
		}*/
	}
</style>