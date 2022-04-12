<template>
	<form @submit.prevent="subscribe"
		  class="bg-white search-bar mb-8 pt-4 md:pt-0 z-10">
		<div class="big-font lowercase text-center  test"
			 style="margin-bottom: 2rem"
			 v-html="article.contentHtml"></div>
		<label for="query"
			   hidden></label>
		<input
				class="text-center"
				id="query"
				placeholder="email address"
				type="text"
				v-model="email">
		
		<input type="submit" value="submit">
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
							 this.$toasted.show(error.response.data?.message, {
								 duration: 5000,
								 position: "bottom-center",
								 type: "error"
							 });
						 });
			}
		}
	};
</script>
<style scoped
	   lang="scss">
	.h1 {
		font-size: 1.5rem;
	}
	
	button.suggestion {
		// border: 1px solid;
		border-radius: 300px;
		padding: .25rem .5rem;
		
		&.selected {
			background: black;
			color: white;
		}
	}
	
	input[type=submit] {
		background: none;
		border: none;
		margin-top: 2rem;
	}
	
	input {
		border: 1px solid;
		border-radius: 500px;
		padding: .5rem 1rem;
		width: 100%;
		font-size: 2.15rem;
		
		&::placeholder {
			color: gray;
		}
	}
	
	.search-bar {
		top: 0;
		@media (min-width: 1024px) {
			top: var(--header-height);
		}
	}
</style>