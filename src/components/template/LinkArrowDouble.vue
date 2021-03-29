<template>
	<div class="flex items-center justify-between">
		<div class="w-1/2">
			<!-- .h1 -->
			<a class="block italic link mt-minus-4"
			   style="margin-bottom: var(--header-height)"
			   :href="linkLeft"
			   v-if="linkLeft && linkLeft.includes('http')">
				{{ contentLeft.innerText }}
			</a>
			<router-link class="block italic mt-minus-4 router-link"
						 style="margin-bottom: var(--header-height)"
						 :to="linkLeft"
						 v-else-if="linkLeft">
				{{ contentLeft.innerText }}
			</router-link>
		</div>
		<div class="ml-2 w-1/2">
			<!-- .h1 -->
			<a class="block italic link mt-minus-4"
			   style="margin-bottom: var(--header-height)"
			   :href="linkRight"
			   v-if="linkRight && linkRight.includes('http')">
				{{ contentRight.innerText }}
			</a>
			<router-link class="block italic mt-minus-4 router-link"
						 style="margin-bottom: var(--header-height)"
						 :to="linkRight"
						 v-else-if="linkRight">
				{{ contentRight.innerText }}
			</router-link>
		</div>
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	
	export default {
		name: "LinkArrowDouble",
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		computed: {
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

<style scoped>

</style>