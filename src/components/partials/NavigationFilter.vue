<template>
	<div>
		<div class="flex md:ml-4">
			<Route class="mr-1"
				   :class="{ 'text-gray-600': active !== mainItem }"
				   @click="active = mainItem"
				   :exact="false"
				   :to="getRoute(mainItem)"
				   :key="mainItem.innerText"
				   v-for="(mainItem, index) of mainListItems">
				{{ mainItem.innerText }}{{
				mainListItems[index + 1] ? ',' : ''
				}}
			</Route>
			<Route class="mr-1"
				   :class="{ 'ml-3': index === 0, 'text-gray-600': subItem.innerText !== $route.params.variant }"
				   :to="getRoute(subItem, active)"
				   :key="subItem.innerText"
				   v-for="(subItem, index) of getSubListItems(active)">
				{{ subItem.innerText }}{{ getSubListItems(active)[index + 1] ? ',' : '' }}
			</Route>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Route from "./Route";
	
	export default {
		name: "NavigationFilter",
		components: {Route},
		props: {
			base: {
				type: String,
				default: () => ""
			},
			name: {
				type: String,
				required: true
			}
		},
		computed: {
			...mapGetters("shopify/blog", ["articles"]),
			active() {
				return Array
					.from(this.mainListItems)
					.find(item => item.innerText === this.$route.params.collection)
			},
			article() {
				return this.articles
						   .find(a => a.blogTitle === this.name);
			},
			mainNode() {
				return this.article ?
					   this.article.contentNodes.querySelector("ul") :
					   null;
			},
			mainListItems() {
				if ( ! this.mainNode) {
					return [];
				}
				return this.mainNode.querySelectorAll(':scope > li') || [];
			}
		},
		methods: {
			getRoute(item, parent) {
				return `${ this.base }/${
					parent ? parent.innerText.trim() : item.innerText.trim()
				}${
					parent ? '/' + item.innerText.trim() : ''
				}`
			},
			getSubListItems(item) {
				if ( ! item || ! item.nextElementSibling) {
					return [];
				}
				return item.nextElementSibling.querySelectorAll(':scope > li') || [];
			}
		},
		async created() {
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				this.name
			);
		},
		async updated() {
			await this.$store.dispatch(
				'shopify/blog/fetchArticlesByBlog',
				this.name
			);
		}
	};
</script>

<style scoped>

</style>