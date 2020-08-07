<template>
	<div>
	
	</div>
</template>

<script>
	import Variant from "../../modules/shopify/Variant";
	
	export default {
		name: "Variant",
		props: {
			variant: {
				type: Variant,
				required: true
			}
		}
	};
</script>

<style scoped>

</style>