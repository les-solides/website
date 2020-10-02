<template>
	<div class="hash-menu sticky md:fixed md:w-1/6 w-full"
		 style="margin-top: -1rem">
		<button :to="$route.path + '#section-' + index"
				class="block"
				:class="{ 'text-gray-600': `#${ item.hash }` !== $route.hash }"
				@click="move(index)"
				:key="item.handle"
				v-for="(item, index) of items">
			x {{ item.name }}
		</button>
	</div>
</template>

<script>
	import HashMenuItem from "../../modules/HashMenuItem";
	import { mapState } from "vuex";
	
	export default {
		name: "HashMenu",
		props: {
			items: {
				type: Array,
				validator: prop => prop.every(i => i instanceof HashMenuItem)
			}
		},
		computed: {
			...mapState({
				collaborationHash: state => state.collaborationHash
			})
		},
		methods: {
			move(index) {
				window.fullpage_api.moveTo(index + 1);
			}
		}
	};
</script>
<style lang="scss">
	@import "./../../scss/partials/variables";
	
	.hash-menu {
		top: 1rem;
		@media screen and (min-width: $breakpoint-md) {
			top: 5.5rem;
		}
	}
</style>