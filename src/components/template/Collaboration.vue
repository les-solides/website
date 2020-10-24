<template>
	<div :id="article.handle"
		 class="collaboration mt-4 md:mt-0">
		<button
			ref="tooltipContainer"
			@click="handleClick"
			@mouseleave="handleMouseLeave"
			class="inner">
			<!-- tooltip content -->
			<transition name="fade">
				<span class="absolute"
					  ref="tooltipContent"
					  v-show="tooltipActive">
				<span class="block">
					{{ o(product).title }} ({{ activeImageIndex + 1 }}/{{ imageCount }})
				</span>
				<span class="block text-left kapitälchen">
					{{ o(product).price }}
				</span>
			</span>
			</transition>
			<!-- tooltip content -->
			<span class="left"></span>
			<span class="right"></span>
			<LoadedImage
					class="mr-4 object-contain"
					style="cursor: w-resize;"
					:key="o(activeImage).src || o(activeImage).transformedSrc"
					:src="o(activeImage).src || o(activeImage).transformedSrc" />
			<div class="flex justify-end w-full"
				 style="margin-left: calc(33.33333% - 1rem);width: calc(66.66666% + 1rem)">
				<router-link :to="productRoute">go to product</router-link>
			</div>
		</button>
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import LoadedImage from "../partials/LoadedImage";
	
	export default {
		name: "Collaboration",
		components: {LoadedImage},
		props: {
			article: {
				type: Article,
				required: true
			}
		},
		data: () => ({
			activeImageIndex: 0,
			product: null,
			tooltipActive: false,
			tooltipTimeout: null
		}),
		computed: {
			activeImage() {
				return this.images?.[this.activeImageIndex];
			},
			imageCount() {
				return this.images?.length || 0;
			},
			images() {
				return [
					this.article?.featuredImage,
					...this.article?.images
				].filter(i => i);
			},
			productHandle() {
				return this.article.getTag(/product:*/, /product:*/);
			},
			productRoute() {
				return this.o(this.product).handle ?
					   `/product/${ this.product.handle }` :
					   '';
			},
			tooltipContainer() {
				return this.$refs.tooltipContainer;
			},
			tooltipContent() {
				return this.$refs.tooltipContent;
			}
		},
		methods: {
			handleClick() {
				if (this.activeImageIndex >= this.imageCount - 1) {
					this.activeImageIndex = 0;
					return this.$emit('index:update', 0);
				}
				this.activeImageIndex++;
				return this.$emit('index:update', this.activeImageIndex);
			},
			handleMouseMove(e) {
				this.tooltipActive = true;
				clearTimeout(this.tooltipTimeout);
				this.tooltipContent.style.left = `${ e.clientX }px`;
				this.tooltipContent.style.top = `${ e.clientY - 100 }px`;
				this.tooltipTimeout = setTimeout(() => this.tooltipActive = false, 1500);
			},
			handleMouseLeave() {
				this.tooltipActive = false;
				clearTimeout(this.tooltipTimeout);
			}
		},
		async mounted() {
			this.product = await this.$store.dispatch(
				'shopify/product/fetchByHandle',
				this.productHandle
			);
			this.$nextTick(() => {
				this.tooltipContainer.removeEventListener('mousemove', this.handleMouseMove);
				this.tooltipContainer.addEventListener('mousemove', this.handleMouseMove);
			});
		},
		destroyed() {
			this.tooltipContainer.removeEventListener('mousemove', this.handleMouseMove);
		}
	};
</script>
<style lang="scss">
	.collaboration {
		width: 100%;
	}
	.inner {
		height: calc(100vh - var(--header-height) - 8rem);
		position: relative;
		width: 100%;
		
		.left {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			cursor: w-resize;
			width: 50%;
		}
		.right {
			position: absolute;
			right: 0;
			top: 0;
			height: 100%;
			cursor: e-resize;
			width: 50%;
		}
		
		img {
			height: 100%;
			object-fit: cover;
			width: 100%;
		}
	}
</style>