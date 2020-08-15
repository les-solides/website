<template>
	<form class="border border-black md:w-1/2 mx-auto p-8 w-full"
		  @submit.prevent="subscribe">
		<h1 class="text-center">
			{{ article.content }}
		</h1>
		<label for="email"
			   hidden></label>
		<input id="email"
			   class="block border border-black mt-4 mx-auto p-4 placeholder-black text-black w-3/4"
			   type="email"
			   placeholder="your email here"
			   v-model="email">
		
		<input class="bg-transparent block mt-4 mx-auto p-4 text-center"
			   type="submit"
			   value="Submit">
	</form>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import api from "../../api/api";
	
	export default {
		name: "NewsletterSubscribe",
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
							 })
						 });
			}
		}
	};
</script>

<style scoped>

</style>