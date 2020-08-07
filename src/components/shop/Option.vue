<template>
	<div class="flex"
		 v-if="option">
		<span class="mr-2"
			  v-if="option.name">
			{{ _.lowerCase(option.name) }}:
		</span>
		<button @click="select(value)"
				:key="value"
				v-for="(value, index) of option.values">
			<span :class="{ 'text-gray-600': selected !== value }">{{ value }}</span>
			<span class="mr-1"
				  :class="{ 'text-gray-600': selected !== value }"
				  v-if="index < option.values.length - 1">,</span>
		</button>
	</div>
</template>

<script>
	import Option from "../../modules/shopify/Option";
	
	export default {
		name: "Option",
		props: {
			option: {
				type: Option,
				required: true
			}
		},
		data: () => ({
			selected: null
		}),
		methods: {
			select(value) {
				this.selected = value;
				this.$emit('select', value);
			}
		},
		created() {
			this.select(this.option.values[0]);
		}
	};
</script>

<style scoped>

</style>