<template>
	<button class="comp__burger">
		<svg class="block"
			 :class="{ open }"
			 xmlns="http://www.w3.org/2000/svg"
			 xmlns:xlink="http://www.w3.org/1999/xlink"
			 viewBox="0 0 100 100"
			 version="1.1"
			 width="100px"
			 height="100px">
			<g id="surface1">
				<line class="cls-1 line1"
					  x1="0"
					  y1="20"
					  x2="100"
					  y2="20" />
				<line class="cls-1 line2"
					  x1="0"
					  y1="50"
					  x2="100"
					  y2="50" />
				<line class="cls-1 line3"
					  x1="0"
					  y1="80"
					  x2="100"
					  y2="80" />
				<!--<path style=" " d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z "/>-->
			</g>
		</svg>
	</button>
</template>

<script>
	export default {
		name: "Burger",
		props: {
			open: {
				type: Boolean,
				required: true
			}
		}
	};
</script>

<style scoped
	   lang="scss">
	
	button {
		outline: none;
		padding: unset;
	}
	
	svg {
		cursor: pointer;
		height: 20px;
		transition: 1s;
		width: 20px;
	}
	
	.cls-1 {
		fill: none;
		stroke: #000;
		stroke-miterlimit: 10;
		stroke-width: 4;
		transition: 1s;
	}
	
	.open {
		.line1 {
			transform: translate(30px, 12px) rotate(45deg);
		}
		
		.line2 {
			opacity: 0;
			transform: scaleX(0);
			transition: 0.25s;
		}
		
		.line3 {
			transform: translate(-42px, 40px) rotate(-45deg);
		}
	}

</style>