<template>
	<div class="border border-black md:w-1/2 mx-auto p-8 w-full">
		<h1 class="text-center">
			{{ article.content }}
		</h1>
		<input class="block border border-black mt-4 mx-auto p-4 placeholder-black text-black w-3/4"
			   type="email"
			   placeholder="your email here">
		
		<input class="bg-transparent block mt-4 mx-auto p-4 text-center"
			   type="submit" value="Submit">
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	
	export default {
		name: "NewsletterSubscribe",
		props: {
			article: {
				type: Article,
				required: true
			}
		}
	};
</script>

<style scoped>

</style>