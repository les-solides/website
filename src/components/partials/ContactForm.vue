<template>
	<form class="border border-black md:w-1/2 mx-auto p-8 w-full"
		  @submit.prevent="contact">
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
		
		<label hidden for="subject"></label>
		<input id="subject"
			   class="block border border-black mt-4 mx-auto p-4 placeholder-black text-black w-3/4"
			   placeholder="subject"
			   v-model="subject">
		
		<label for="message"
			   hidden></label>
		<textarea id="message"
				  class="block border border-black mt-4 mx-auto p-4 placeholder-black text-black w-3/4"
				  placeholder="message"
				  v-model="message"></textarea>
		
		<input class="bg-transparent block mt-4 mx-auto p-4 text-center"
			   type="submit"
			   value="Submit">
	</form>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import api from "../../api/api";
	
	export default {
		name: "ContactForm",
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		data: () => ({
			email: "",
			subject: "",
			message: ""
		}),
		methods: {
			async contact() {
				await this.$store.commit('updateLoading', true);
				await this.wait(500);
				await this.$store.commit('updateLoading', false);
				await api.post('/api/contact', {
					email: this.email,
					subject: this.subject,
					message: this.message
				})
						 .then(() => this.$toasted.show("message sent", {
							 duration: 5000,
							 position: "bottom-center"
						 }))
						 .catch(error => this.$toasted.show(error.response.data.message, {
							 duration: 5000,
							 position: "bottom-center",
							 type: "error"
						 }));
			}
		},
	};
</script>

<style scoped>

</style>