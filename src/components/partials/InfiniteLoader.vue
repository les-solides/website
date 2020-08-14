<template>
	<div class="slider" :style="`width: ${ width }`">
		<div class="line"></div>
		<div class="subline inc"></div>
		<div class="subline dec"></div>
	</div>
</template>

<script>
	export default {
		name: "InfiniteLoader",
		props: {
			width: {
				type: String,
				default() {
					return '100%';
				}
			}
		}
	};
</script>

<style scoped>
	.slider{
		position:absolute;
		width:1000px;
		height:5px;
		overflow-x: hidden;
	}
	
	.line{
		position:absolute;
		opacity: 0.4;
		background:#e0e0e0;
		width:150%;
		height:1px;
	}
	
	.subline{
		position:absolute;
		background:black;
		height:1px;
	}
	.inc{
		animation: increase 2s infinite;
	}
	.dec{
		animation: decrease 2s 0.5s infinite;
	}
	
	@keyframes increase {
		from { left: -5%; width: 5%; }
		to { left: 130%; width: 100%;}
	}
	@keyframes decrease {
		from { left: -80%; width: 80%; }
		to { left: 110%; width: 10%;}
	}
</style>