<template>
<div>
    <video :loop="loop" :muted="muted" :autoplay="autoplay" :data-keepplaying="keepplaying" id="vid">
        <source :src="src" :type="type" />
    </video>
</div>
</template>

<script>
export default {
    name: 'Vid',
    props: {
        fullscreen: {
            type: Boolean,
            default: false
        },
        darken: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        muted: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: true
        },
        keepplaying: {
            type: Boolean,
            default: true
        },
        src: {
            type: String,
            default: '../assets/videos/landing_v2.mp4'
        },
        type: {
            type: String,
            default: 'video/mp4'
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
#vid {
  width: 100%;
  margin: 0px;
  z-index: 0;
}
</style>