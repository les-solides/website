<template>
	<div class="mb-32">
		<HashMenu class="z-10"
				  :indices="activeImageIndices"
				  :items="hashMenuItems"
				  @route="$refs.fullPage.moveTo($event)" />
		<full-page ref="fullPage"
				   :options="options"
				   :skip-init="true"
				   v-if="options.anchors.length">
			<component class="mb-12 section"
					   :is="_.startCase(article.template).split(' ').join('')"
					   :key="article.id"
					   :article="article"
					   @index:update="activeImageIndices[article.id] = $event"
					   v-for="(article) of collaborationArticles" />
		</full-page>
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
			activeImageIndices: {},
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
							   `collaboration-${ a.handle }`,
							   a.images?.length,
							   a.id
						   ));
			},
			options() {
				return {
					anchors: this.collaborationArticles.map(a => `collaboration-${ a.handle }`),
					fitToSection: false,
					licenseKey: 'BEEAAF1E-F23E4BCD-85FA7E40-2F7456B5'
				};
			}
		},
		methods: {
			componentsReady() {
				this.$refs.fullPage.init();
			}
		},
		metaInfo: {
			title: 'collaborations',
			meta: [
				{
					name: "description",
					content: "we at les solides love to collaborate with talented artists. visit our collaboration page to see who we have been working with."
				}
			]
		},
		async mounted() {
			await this.$store.commit('updateLoading', true);
			
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				'Collaborations'
			);
			
			await this.$store.commit('updateLoading', false);
			
			this.$nextTick(() => {
				this.componentsReady();
				this.collaborationArticles.forEach(a => this.activeImageIndices[a.id] = 0);
			});
		}
	};
</script>