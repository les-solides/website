<template>
	<div class="absolute h-screen overflow-scroll bg-white left-0 top-0 w-screen z-50"
		 ref="horizontal-scroll">
		<header class="h-full md:h-auto md:sticky md:p-default md:top-0
					text-center top-0 transition-medium w-full z-20">
			<nav class="md:flex justify-between">
				<Route class="md:py-0 py-8"
					   to="/home">
					les solides
				</Route>
			</nav>
		</header>
		<div class="absolute top-0"
			 ref="tooltipContainer"
			 :style="`height: ${height}`"
			 v-if="article">
			<div class="flex sticky overflow-x-hidden top-0 w-screen">
				<div class="flex h-screen"
					 ref="translatable-element">
					<Route :to="getImageLink(image)"
						   style="min-width: 100vw"
						   :key="image.src"
						   v-for="image of images">
						<img class="h-screen object-cover w-screen"
							 :src="image.src"
							 :alt="image.alt" />
					</Route>
				</div>
			</div>
		</div>
		<transition name="fade-fast">
			<div class="absolute"
				 ref="tooltipContent"
				 v-show="tooltipActive">
				<div>click to enter /</div>
				<div>scroll for more images</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Article from "../../modules/shopify/blog/Article";
	import { mapGetters } from "vuex";
	import Route from "../partials/Route";
	
	export default {
		name: "LinkHorizontalGallery",
		components: {Route},
		props: {
			article: {
				type: Article,
				required: true
			},
			fallbackRoute: {
				type: String,
				default: undefined
			}
		},
		data: () => ({
			options: {
				vuescroll: {
					wheelDirectionReverse: true
				}
			},
			scrollTop: 0,
			tooltipActive: false,
			transitionName: 'fade'
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
			},
			tooltipContainer() {
				return this.$refs.tooltipContainer;
			},
			tooltipContent() {
				return this.$refs.tooltipContent;
			}
		},
		methods: {
			getImageLink(image) {
				const match = this.o(image.alt.match(/link:(.*)$/gm))[0];
				if ( ! match) {
					return this.fallbackRoute || this.$route.path;
				}
				return match.split(':')[1] || this.fallbackRoute || this.$route.path;
			},
			handleMouseMove(e) {
				this.tooltipActive = true;
				clearTimeout(this.tooltipTimeout);
				this.tooltipContent.style.left = `${ e.clientX + 25 }px`;
				this.tooltipContent.style.top = `${ e.clientY + this.scrollTop }px`;
				this.tooltipTimeout = setTimeout(() => this.tooltipActive = false, 1500);
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.$refs['horizontal-scroll'].addEventListener('scroll', () => {
					this.transitionName = 'none';
					this.tooltipActive = false;
					this.scrollTop = this.$refs['horizontal-scroll'].scrollTop;
					const scrollHeight = this.$refs['horizontal-scroll'].scrollHeight;
					const scrollWidth = this.$refs['translatable-element'].scrollWidth;
					const scrollRatio = scrollWidth / scrollHeight;
					this.translation = this.scrollTop * scrollRatio;
					
					this.$refs['translatable-element'].style.transform =
						`translateX(${ -this.translation }px)`;
					this.transitionName = 'fade';
				});
				this.tooltipContainer.removeEventListener('mousemove', this.handleMouseMove);
				this.tooltipContainer.addEventListener('mousemove', this.handleMouseMove);
			});
		},
		destroyed() {
			this.tooltipContainer.removeEventListener('mousemove', this.handleMouseMove);
		}
	};
</script>