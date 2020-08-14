<template>
	<div class="bg-white fixed h-screen left-0 p-4 top-0 w-screen z-50"
		 v-if="value">
		<Cross class="mb-4"
			   @click="$emit('input', false)" />
		<slot></slot>
	</div>
</template>

<script>
	import Cross from "./Cross";
	
	export default {
		name: "PopupMobile",
		components: {Cross},
		props: {
			value: {
				type: Boolean,
				required: true
			}
		}
	};
</script>

<style scoped>

</style>