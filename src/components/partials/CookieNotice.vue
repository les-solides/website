<template>
	<div class="fixed bottom-0 shadow-md-reverse w-full z-50">
		<div class="bg-white flex flex-wrap justify-between md:flex-no-wrap px-8 py-4 w-full z-10"
			 v-if=" ! accepted">
			<div class="md:w-3/4 w-full">
				<slot></slot>
			</div>
			<div class="flex justify-start md:justify-end md:w-1/4 md:mt-0 mt-8 w-full">
				<a :href="url"
				   class="mr-2"
				   v-if="url">read more</a>
				<button class="primary"
						@click="accept">{{ buttonContent }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "CookieNotice",
		props: {
			buttonContent: {
				type: String,
				default: "okay"
			},
			url: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				accepted: false
			};
		},
		methods: {
			accept() {
				this.accepted = true;
				localStorage.setItem('cookie-notice', Date.now()
														  .toString());
			}
		},
		created() {
			this.accepted = !! localStorage.getItem('cookie-notice');
		}
	};
</script>
