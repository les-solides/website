<template>
	<div class="absolute h-screen overflow-scroll bg-white left-0 top-0 w-screen z-50"
		 ref="horizontal-scroll">
		<div :style="`height: ${height}`"
			 v-if="article">
			<div class="flex sticky overflow-x-hidden top-0">
				<div class="flex h-screen" ref="translatable-element">
					<div style="min-width: 100vw"
						 :key="image.src"
						 v-for="image of images">
						<img class="h-screen object-cover w-screen"
							 :src="image.src"
							 :alt="image.alt" />
					</div>
				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import { mapGetters } from "vuex";
	
	export default {
		name: "LinkHorizontalGallery",
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		data: () => ({
			options: {
				vuescroll: {
					wheelDirectionReverse: true
				}
			}
		}),
		computed: {
			...mapGetters(['isMobile']),
			height() {
				return this.images ?
					   `${ this.images.length * 100 || 100 }vh` :
					   '100vh';
			},
			images() {
				if ( ! this.article) {
					return [];
				}
				return Array.from(this.article.images)
						   .filter(image =>
							   this.isMobile ?
							   image.alt.includes('screen:mobile') :
							   ! image.alt.includes('screen:mobile')
						   );
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.$refs['horizontal-scroll'].addEventListener('scroll', () => {
					const scrollTop = this.$refs['horizontal-scroll'].scrollTop;
					const scrollHeight = this.$refs['horizontal-scroll'].scrollHeight;
					const scrollWidth = this.$refs['translatable-element'].scrollWidth;
					const scrollRatio = scrollWidth / scrollHeight;
					const translation = scrollTop * scrollRatio;
					
					this.$refs['translatable-element'].style.transform =
						`translateX(${-translation}px)`;
				});
				
			});
		}
	};
</script>