<template>
	<div id="observer">
		<HashMenu :items="hashMenuItems"
				  @route="blocked = true" />
		<component class="mb-32"
				   :is="_.startCase(article.template).split(' ').join('')"
				   :key="article.id"
				   :article="article"
				   v-for="article of collaborationArticles" />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Collaboration from "../components/template/Collaboration";
	import HashMenu from "../components/partials/HashMenu";
	import HashMenuItem from "../modules/HashMenuItem";
	import { delay } from "lodash";
	
	export default {
		name: "Collaborations",
		components: {Collaboration, HashMenu},
		data: () => ({
			blocked: false,
			observeReady: false
		}),
		computed: {
			...mapGetters("shopify/blog", ["articles"]),
			collaborationArticles() {
				return this.articles
						   .filter(a => a.blogTitle === "Collaborations")
						   .sort((a, b) => a.order - b.order) || [];
			},
			hashMenuItems() {
				return this.collaborationArticles
						   .map(a => new HashMenuItem(
							   a.title,
							   a.handle
						   ));
			}
		},
		methods: {
			getProductHandles(article) {
				const handles = Array.from(article.selectElements("li"));
				if ( ! Array.isArray(handles)) {
					return [];
				}
				return handles.map(h =>
					h.children && h.children.length ?
					h.children[0].innerText :
					h.innerText
				);
			},
			scrollToAnchor () {
				this.$nextTick(() => {
					if(this.$route.hash) {
						const $el = document.querySelector(this.$route.hash)
						$el && window.scrollTo(0, $el.offsetTop - 100);
					}
				});
			}
		},
		async created() {
			await this.$store.commit('updateLoading', true);
			if (this.collaborationArticles.length) {
				return this.$store.commit('updateLoading', false);
			}
			
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				'Collaborations'
			);
			
			for (let article of this.collaborationArticles) {
				const productHandles = this.getProductHandles(article);
				for (let handle of productHandles) {
					const product = await this.$store.dispatch(
						'shopify/product/fetchByHandle',
						handle
					);
					if (product) {
						article.products.push(product);
					}
				}
			}
			await this.$store.commit('updateLoading', false);
			await this.wait(200);
			this.blocked = true;
			this.articles.forEach(a => {
				let observer = new IntersectionObserver((entries) => {
					if (this.blocked) {
						return delay(() => this.blocked = false, 200);
					}
					history.pushState(
						{},
						window.title,
						window.location.pathname + "#" + entries[0].target.id
					);
					this.$store.state.collaborationHash = entries[0].target.id;
				}, {
					root: null,
					threshold: 1
				});
				
				const element = document.querySelector(`#${ a.handle }`);
				element && observer.observe(element);
			});
			this.scrollToAnchor();
			await this.wait(200);
			this.blocked = false;
		}
	};
</script>

<style scoped>

</style>