<template>
	<div :id="article.handle"
		 class="collaboration mx-auto" style="transform: translateX(-1vw)">
		<ProductLink :product="products[0]"
					 v-if="products[0]" />
	</div>
</template>

<script>
	import ProductLink from "../shop/ProductLink";
	import Article from "../../modules/shopify/blog/Article";
	
	export default {
		name: "Collaboration",
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
		methods: {
			scrollToAnchor () {
				this.$nextTick(() => {
					if(this.$route.hash) {
						const $el = document.querySelector(this.$route.hash)
						$el && window.scrollTo(0, $el.offsetTop - 100);
					}
				});
			}
		},
		mounted () {
			this.scrollToAnchor();
		},
		updated () {
			this.scrollToAnchor();
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
			this.ready = true;
		}
	};
</script>

<style scoped>

</style>