<template>
	<form @submit.prevent="subscribe">
		<label for="email"
			   hidden></label>
		<input id="email"
			   type="email"
			   placeholder="(subscribe to our newsletter!)"
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
		name: "NewsletterSubscribeBig",
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

<style scoped lang="scss">
	input {
		display: block;
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		border: 1px solid;
		font-size: 3.5rem;
		border-radius: 300px;
		padding: 2rem 4rem;
		text-align: center;
	}
</style>