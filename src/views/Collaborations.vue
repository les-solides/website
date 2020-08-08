<template>
	<div id="observer">
		<HashMenu :items="hashMenuItems" />
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
		async created() {
			if (this.collaborationArticles.length) {
				return;
			}
			
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				'Collaborations'
			);
		},
		mounted() {
			this.$nextTick(() => delay(() => {
				this.articles.forEach(a => {
					let initial = true;
					let observer = new IntersectionObserver((entries, observer) => {
						if (initial && this.$store.state.routeClick) {
							return initial = false;
						}
						this.$store.state.collaborationHash = entries[0].target.id;
						history.pushState(
							{},
							window.title,
							window.location.pathname + "#" + entries[0].target.id
						);
					}, {
						root: null,
						threshold: 1
					});
					
					observer.observe(document.querySelector(`#${ a.handle }`));
				})
				
			}, 1200));
			this.$store.state.collaborationHash = this.$route.hash.slice(1);
		}
	};
</script>

<style scoped>

</style>