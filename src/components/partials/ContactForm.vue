<template>
	<form class="md:w-1/2 w-full"
		  @submit.prevent="contact">
		<h1 class="mb-4">contact</h1>
		<div class="flex w-full">
			<div class="w-1/4">
				<label for="name" hidden></label>
				<h1>name*</h1>
			</div>
			<div class="flex items-center w-3/4">
				<input id="name"
					   class="special block placeholder-black text-black w-3/4"
					   type="text"
					   placeholder="name"
					   v-model="name">
			</div>
		</div>
		
		<div class="flex w-full">
			<div class="w-1/4">
				<label for="email" hidden></label>
				<h1>email*</h1>
			</div>
			<div class="flex items-center w-3/4">
				<input id="email"
					   class="special block placeholder-black text-black w-3/4"
					   type="email"
					   placeholder="email"
					   v-model="email">
			</div>
		</div>
		
		<div class="flex w-full">
			<div class="w-1/4">
				<label for="phone" hidden></label>
				<h1>phone number</h1>
			</div>
			<div class="flex items-center w-3/4">
				<input id="phone"
					   class="special block placeholder-black text-black w-3/4"
					   type="text"
					   placeholder="phone number"
					   v-model="phone">
			</div>
		</div>
		
		<div class="flex w-full">
			<div class="w-1/4">
				<label for="order" hidden></label>
				<h1>order number</h1>
			</div>
			<div class="flex items-center w-3/4">
				<input id="order"
					   class="special block placeholder-black text-black w-3/4"
					   type="text"
					   placeholder="#0000"
					   v-model="order">
			</div>
		</div>
		
		<div class="flex w-full">
			<div class="w-1/4">
				<label for="subject" hidden></label>
				<h1>subject*</h1>
			</div>
			<div class="flex items-center w-3/4">
				<input id="subject"
					   class="special block placeholder-black text-black w-3/4"
					   type="text"
					   placeholder="subject"
					   v-model="subject">
			</div>
		</div>
		
		<div class="divider my-4"></div>
		
		<label for="message"
			   hidden></label>
		<textarea id="message"
				  class="block placeholder-black text-black w-full"
				  placeholder="message ..."
				  style="height: 200px"
				  v-model="message"></textarea>
		
		<input class="block mt-4 text-center"
			   type="submit"
			   value="send">
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
			message: "",
			name: "",
			order: "",
			phone: ""
		}),
		methods: {
			async contact() {
				await this.$store.commit('updateLoading', true);
				await api.post('/api/contact', {
					email: this.email,
					subject: this.subject,
					message: this.message,
					name: this.name,
					order: this.order,
					phone: this.phone
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
				await this.$store.commit('updateLoading', false);
			}
		},
	};
</script>

<style scoped lang="scss">
	.divider {
		height: .5px;
		width: 100%;
		background: #8e8e8e;
	}
	input[type=submit] {
		background: none;
		font-size: 1.25rem;
	}
	::placeholder {
		color: gray;
		font-size: 1.25rem;
	}
</style>