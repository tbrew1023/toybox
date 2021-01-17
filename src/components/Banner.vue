<template>
    <div class="banner-container" :style="'background-image: url(' + backgroundImage + ')'">
        <div class="banner-content">
            <h1 :style="'color:' + primaryColor">{{ title }}</h1>
            <p>{{ subtitle }}</p>
            <router-link :to="actionLink"><div :style="'background:' + primaryColor" class="primary-action">About this Project</div></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Banner',
        props: {
            title: {
                type: String,
                default: 'Banner Title'
            },
            subtitle: {
                type: String,
                default: 'Banner subtitle'
            },
            backgroundImage: String,
            actionLink: {
                type: String,
                default: '/'
            },
            primaryColor: {
                type: String,
                default: 'black'
            }
        }
    }
</script>

<style lang="scss" scoped>

a {
    text-decoration: none;
}

.primary-action {
    width: max-content;
    padding: 12px 24px;
    color: white;
    border-radius: 8px;
    margin-top: 32px;
    cursor: pointer;
    transition: 200ms;

    &:hover {
        transform: scale(0.95) !important;
    }
}

.banner-content {
    text-align: left;
    margin-left: 80px;

    h1 {
        font-size: 48px;
        margin: 0px;
    }

    p {
        color: black;
        opacity: 0.4;
        font-size: 18px;
    }
}

.banner-container {
    background: blue;
    height: 300px;
    width: 1500px;
    border-radius: 8px;
    display: flex;
    justify-content: left;
    align-items: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

</style>