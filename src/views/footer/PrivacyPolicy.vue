<template>
	<div class="text-left footer-page w-full">
		<!--<h3>{{ title }}</h3>-->
		<div v-html="content"></div>
		<Error v-if="loaded && error" />
	</div>
</template>

<script>
	import Error from "../../components/partials/Error";
	export default {
		name: "PrivacyPolicy",
		components: {Error},
		data: () => ({
			content: null,
			error: false,
			loaded: false,
			title: null
		}),
		async created() {
			const result = await this.$store.dispatch(
				'shopify/blog/fetchFirstArticleByTags',
				'page:privacy-policy'
			);
			
			this.loaded = true;
			
			if ( ! result) {
				return this.error = true;
			}
			
			this.content = result.contentHtml;
			this.title = result.title;
		}
	};
</script>