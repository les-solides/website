<template>
	<div class="flex flex-wrap justify-center"
		 style="margin-bottom: var(--header-height)">
		<div class="md:w-1/2 w-full">
			<a :href="image.alt"
			   class="flex items-center relative"
			   v-if="image">
				<LoadedImage class="md:pl-2 w-full"
							 :class="{ darken: article.selectElement('#overlay').innerText }"
							 :src="image.src"
							 :alt="image.alt" />
				<span class="overlay absolute"
					  v-html="articleOverlay"></span>
			</a>
			<div class="md:ml-2 mt-text-default w-full"
				 v-if="link">
				<!-- .h1 -->
				<a class="block italic"
				   :href="link"
				   v-if="link && link.includes('http')">
					{{ content.innerText }}
				</a>
				<router-link class="block italic"
							 :to="link"
							 v-else-if="link">
					{{ content.innerText }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "LinkCenterFrame",
		components: {LoadedImage},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		computed: {
			articleOverlay() {
				return this.article.selectElement("#overlay").outerHTML;
			},
			image() {
				return this.article?.images?.[0];
			},
			content() {
				return this.article.selectElement('[data-link]');
			},
			link() {
				return this.content?.dataset?.link || "";
			}
		}
	};
</script>

<style scoped>
.overlay {
	left: 50%;
	min-width: calc(100vw - 2rem);
	transform: translateX(-50%);
	width: calc(100vw - 2rem);
}
</style>