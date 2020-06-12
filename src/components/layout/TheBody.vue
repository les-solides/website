<template>
	<div id="main">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "TheBody",
		mounted() {
			let root = document.documentElement;
			let header = document.querySelector('header');
			
			if ( ! header || ! header.clientHeight) {
				return;
			}
			
			root.style.setProperty(
				'--header-height',
				String(header.clientHeight)
			);
		}
	};
</script>

<style scoped>
	#main {
		min-height: calc(100vh - var(--header-height));
	}
</style>