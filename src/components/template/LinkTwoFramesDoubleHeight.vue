<template>
	<div class="flex flex-wrap justify-between md:flex-no-wrap"
		 style="margin-bottom: var(--header-height);">
		<!-- Left [start] -->
		<div class="mb-4 md:mb-0 md:mr-2 md:w-1/2 w-full">
			<a :href="leftImage.alt"
			   class="aspect-height flex h-full items-center link relative"
			   v-if="leftImage">
				<LoadedImage class="h-full object-cover w-full"
							 :class="{ darken: article.selectElement('#overlay-left').innerText }"
							 :src="leftImage.src"
							 :alt="leftImage.alt" />
				<span class="absolute h1 text-center text-white w-full">
					{{ article.selectElement("#overlay-left").innerText }}
				</span>
			</a>
			
			<!--sublinks-->
			<div class="mt-text-default w-full"
				 v-if="linkLeft">
				<!-- .h1 -->
				<a class="block italic link"
				   :href="linkLeft"
				   v-if="linkLeft && linkLeft.includes('http')">
					{{ contentLeft.innerText }}
				</a>
				<router-link class="block italic router-link"
							 :to="linkLeft"
							 v-else-if="linkLeft">
					{{ contentLeft.innerText }}
				</router-link>
			</div>
		</div>
		<!-- Left [end] -->
		
		<!-- Right [start] -->
		<div class="md:ml-2 md:w-1/2 w-full">
			<a :href="rightImage.alt"
			   class="aspect-height flex h-full items-center link relative"
			   v-if="rightImage">
				<LoadedImage class="h-full object-cover w-full"
							 :class="{ darken: article.selectElement('#overlay-right').innerText }"
							 :src="rightImage.src"
							 :alt="rightImage.alt" />
				<span class="absolute h1 text-center text-white w-full">
				{{ article.selectElement("#overlay-right").innerText }}
			</span>
			</a>
			
			<!--sublinks-->
			<div class="mt-text-default w-full"
				 v-if="linkRight">
				<!-- .h1 -->
				<a class="block italic link"
				   :href="linkRight"
				   v-if="linkRight && linkRight.includes('http')">
					{{ contentRight.innerText }}
				</a>
				<router-link class="block italic router-link"
							 :to="linkRight"
							 v-else-if="linkRight">
					{{ contentRight.innerText }}
				</router-link>
			</div>
		</div>
		<!-- Right [end] -->
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "LinkTwoFramesDoubleHeight",
		components: {LoadedImage},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		computed: {
			leftImage() {
				if ( ! this.article.images.length) {
					return null;
				}
				return this.article.images[0];
			},
			rightImage() {
				if ( ! this.article.images.length) {
					return null;
				}
				return this.article.images[1];
			},
			contentLeft() {
				return this.article.selectElement('[data-position=left]');
			},
			contentRight() {
				return this.article.selectElement('[data-position=right]');
			},
			linkLeft() {
				return this.contentLeft?.dataset?.link || "";
			},
			linkRight() {
				return this.contentRight?.dataset?.link || "";
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "./../../../src/scss/partials/variables";
	
	.aspect-height {
		height: calc((100vw) * 0.6482248996 * 2);
		@media screen and (min-width: $breakpoint-md) {
			height: calc((50vw - 1rem) * 0.6482248996 * 2);
		}
	}
	
</style>