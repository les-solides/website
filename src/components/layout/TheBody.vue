<template>
	<div id="main"
		 class="p-default">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "TheBody",
		methods: {
			setFooterHeightCSSVariable() {
				let root = document.documentElement;
				let footer = document.querySelector('footer');
				
				if ( ! footer || ! footer.clientHeight) {
					return;
				}
				
				root.style.setProperty(
					'--footer-height',
					`${ footer.clientHeight }px`
				);
			},
			setHeaderHeightCSSVariable() {
				let root = document.documentElement;
				let header = document.querySelector('header');
				
				if ( ! header || ! header.clientHeight) {
					return;
				}
				
				root.style.setProperty(
					'--header-height',
					`${ header.clientHeight > 100 ? 44.8 : header.clientHeight }px`
				);
			}
		},
		mounted() {
			this.setFooterHeightCSSVariable();
			this.setHeaderHeightCSSVariable();
		}
	};
</script>

<style scoped>
	#main {
		min-height: calc(
				100vh -
				var(--header-height) -
				var(--footer-height)
		);
	}
</style>