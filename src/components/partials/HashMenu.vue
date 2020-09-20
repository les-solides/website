<template>
	<div class="fixed w-1/6"
		 style="top: 5.5rem">
		<router-link :to="$route.path + '#' + item.hash"
					 class="block"
					 :class="{ 'text-gray-600': item.hash !== collaborationHash }"
					 @click.native="$emit('route')"
					 :key="item.handle"
					 v-for="item of items">
			x {{ item.name }}
		</router-link>
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
		}
	};
</script>