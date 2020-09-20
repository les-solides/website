<template>
	<div id="observer">
		<HashMenu class="z-10"
				  :items="hashMenuItems"
				  @route="blocked = true" />
		<component class="mb-12"
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
			await this.$store.commit('updateLoading', true);
			
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				'Collaborations'
			);
			
			await this.$store.commit('updateLoading', false);
		}
	};
</script>