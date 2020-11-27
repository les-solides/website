<template>
	<NewsletterSubscribeBig
			class="mb-24 mt-24"
			:article="article" />
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import api from "../../api/api";
	import NewsletterSubscribeBig from "./NewsletterSubscribeBig";
	
	export default {
		name: "NewsletterSubscribe",
		components: {NewsletterSubscribeBig},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		data: () => ({
			email: ""
		}),
		methods: {
			async subscribe() {
				await this.$store.commit('updateLoading', true);
				await this.wait(500);
				await this.$store.commit('updateLoading', false);
				await api.post('/api/subscribe', {
					email: this.email
				})
						 .then(() => this.$toasted.show("successfully subscribed", {
							 duration: 5000,
							 position: "bottom-center"
						 }))
						 .catch(error => {
							 this.$toasted.show(error.response.data, {
								 duration: 5000,
								 position: "bottom-center",
								 type: "error"
							 });
						 });
			}
		}
	};
</script>

<style scoped>

</style>