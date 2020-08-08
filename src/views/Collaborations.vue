<template>
	<div>
		<component class="mb-8"
				   :is="_.startCase(article.template).split(' ').join('')"
				   :key="article.id"
				   :article="article"
				   v-for="article of homeArticles" />
	</div>
</template>

<script>
	export default {
		name: "Collaborations"
	};
</script>

<style scoped>

</style>