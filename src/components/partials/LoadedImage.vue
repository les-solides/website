<template>
    <img :class="{ loaded, loading }"
         :sizes="sizes"
         :src="src"
         :srcset="srcset"
         :alt="alt"
         v-if="src"
         @load="(loaded = true) && $emit('load')">
    <div class="empty-image-box" v-else></div>
</template>

<script>
    export default {
        name: "LoadedImage",
        props: ['alt', 'loading', 'sizes', 'src', 'srcset'],
        data () { return { loaded: false }}
    }
</script>

<style scoped lang="scss">
img {
    opacity: 0;
    transition: .5s;
    &.loaded {
        opacity: 1;
        transition: .5s;
    }
}
</style>
