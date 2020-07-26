<template>
	<div class="flex flex-wrap justify-between">
		<ProductLink :product="product"
					 :key="product.id"
					 v-for="product of products" />
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
			products: []
		}),
		computed: {
			productHandles() {
				const handles = Array.from(this.article.selectElements("li"));
				if ( ! Array.isArray(handles)) {
					return [];
				}
				return handles.map(h =>
					h.children && h.children.length ?
					h.children[0].innerText :
					h.innerText
				);
			}
		},
		async created() {
			for (let handle of this.productHandles) {
				const product = await this.$store.dispatch(
					'shopify/product/fetchByHandle',
					handle
				);
				if ( ! product) {
					continue;
				}
				this.products.push(product);
			}
		}
	};
</script>