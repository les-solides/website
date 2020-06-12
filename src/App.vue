<template>
	<div id="app">
		<TheHeader />
		
		<TheBody>
			<router-view />
		</TheBody>
		
		<TheFooter />
	</div>
</template>
<script>
	import TheHeader from "./components/layout/TheHeader";
	import TheFooter from "./components/layout/TheFooter";
	import TheBody from "./components/layout/TheBody";
	export default {
		components: { TheBody, TheFooter, TheHeader }
	};
</script>