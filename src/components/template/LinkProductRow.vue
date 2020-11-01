<template>
	<div class="flex flex-wrap"
		 v-if="ready">
		<ProductLink :class="{
						'mr-4': (index % 2) - 1,
						'md:mr-4': (index % 5) - 4,
						'md:mr-0': (index % 5) - 5
					 }"
					 :product="product"
					 :key="_.uniqueId(o(product).id)"
					 v-for="(product, index) of products" />
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import ProductLink from "../shop/ProductLink";
	
	export default {
		name: "LinkProductRow",
		components: {ProductLink},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		data: () => ({
			products: [],
			ready: false
		}),
		computed: {
			productHandles() {
				const handles = Array.from(this.article.selectElements("ul > li"));
				return Array.isArray(handles) ? handles.map(h => h.innerText) : [];
			}
		},
		methods: {
			async load() {
				const products = this.$store.getters['shopify/product/allProducts'];
				this.products = this.productHandles.map(h =>
					products.find(p => p.handle === h)
				).filter(p => p);
			}
		},
		async created() {
			this.$emit('promise', new Promise(resolve => {
				this.load().then(() => {
					this.ready = true;
					this.$nextTick(() => resolve(true));
				});
			}));
		}
	};
</script>