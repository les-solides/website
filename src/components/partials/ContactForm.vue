<template>
	<form class=""
		  @submit.prevent="contact">
		<h1 class="mb-4">contact</h1>
		
		<div class="form-inputs">
			<div class="flex w-full">
				<div class="flex items-center md:w-1/3 w-1/2">
					<label for="name" hidden></label>
					<h1>name*</h1>
				</div>
				<div class="flex items-center md:w-2/3 w-1/2">
					<input id="name"
						   class="special block placeholder-black text-black w-full"
						   type="text"
						   placeholder="name"
						   v-model="name">
				</div>
			</div>
			
			<div class="flex w-full">
				<div class="flex items-center md:w-1/3 w-1/2">
					<label for="email" hidden></label>
					<h1>email*</h1>
				</div>
				<div class="flex items-center md:w-2/3 w-1/2">
					<input id="email"
						   class="special block placeholder-black text-black w-full"
						   type="email"
						   placeholder="email"
						   v-model="email">
				</div>
			</div>
			
			<div class="flex w-full">
				<div class="flex items-center md:w-1/3 w-1/2">
					<label for="phone" hidden></label>
					<h1>phone number</h1>
				</div>
				<div class="flex items-center md:w-2/3 w-1/2">
					<input id="phone"
						   class="special block placeholder-black text-black w-full"
						   type="text"
						   placeholder="phone number"
						   v-model="phone">
				</div>
			</div>
			
			<div class="flex w-full">
				<div class="flex items-center md:w-1/3 w-1/2">
					<label for="order" hidden></label>
					<h1>order number</h1>
				</div>
				<div class="flex items-center md:w-2/3 w-1/2">
					<input id="order"
						   class="special block placeholder-black text-black w-full"
						   type="text"
						   placeholder="#0000"
						   v-model="order">
				</div>
			</div>
			
			<div class="flex w-full">
				<div class="flex items-center md:w-1/3 w-1/2">
					<label for="subject" hidden></label>
					<h1>subject*</h1>
				</div>
				<div class="flex items-center md:w-2/3 w-1/2">
					<input id="subject"
						   class="special block placeholder-black text-black w-full"
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
		</div>
		
		
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
				
				// api.les-solides
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
	@import "./../../scss/partials/variables";
	
	.md\:columnist-1 {
		@media screen and (min-width: $breakpoint-md) {
			width: var(--column-width-default);
		}
	}
	
	.form-inputs h1 {
		font-size: 1.25rem;
		font-style: normal;
		margin-bottom: 0;
		padding: 0.5rem 0;
		@media screen and (min-width: $breakpoint-md) {
			font-size: 2.15rem;
		}
	}
	
	.divider {
		height: .5px;
		width: 100%;
		background: #8e8e8e;
	}
	input[type=submit] {
		background: none;
		font-size: 1.25rem;
		@media screen and (min-width: $breakpoint-md) {
			font-size: 2.15rem;
		}
	}
	input, textarea {
		font-size: 1.25rem;
		@media screen and (min-width: $breakpoint-md) {
			font-size: 2.15rem;
		}
	}
	::placeholder {
		color: gray;
		font-size: 1.25rem;
		@media screen and (min-width: $breakpoint-md) {
			font-size: 2.15rem;
		}
	}
</style>