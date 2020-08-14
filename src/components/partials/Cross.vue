<template>
	<button class="flex items-center self-start comp__cross"
			@click="$emit('click')">
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80" version="1.1" width="80" height="80px">
			<g id="surface1">
				<line class="cls-1 line1" x1="0" y1="0" x2="80" y2="80"/>
				<line class="cls-1 line3" x1="0" y1="80" x2="80" y2="0"/>
			</g>
		</svg>
	</button>
</template>

<script>
	export default {
		name: "Cross"
	};
</script>

<style scoped lang="scss">
	button {
		outline: none;
		padding: unset;
	}
	
	svg {
		cursor: pointer;
		height: 15px;
		transition: 1s;
		width: 15px;
	}
	
	.cls-1{
		fill:none;
		stroke:#000;
		stroke-miterlimit:10;
		stroke-width: 4;
		transition: 1s;
	}
</style>