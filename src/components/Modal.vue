<template>
    <div class="modal-container">
        <div class="modal-top"><h3>Title</h3><div class="modal-exit">X</div></div>

    </div>
</template>

<script>
    export default {
        name: 'Modal',
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

.modal-container {
    background: white;
    height: 500px;
    width: 700px;
    border-radius: 8px;
    box-shadow: 0px 12px 24px 24px rgba(0,0,0,0.01);

    .modal-top {
        height: 60px;
        width: 100%;
        border-radius: 8px 8px 0px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #e0e0e0 solid;

        .modal-exit {
            margin-right: 24px;
            cursor: pointer;
            height: 24px;
            width: 24px;
            transition: 200ms;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;

            &:hover {
                background: black;
                color: white;
            }
        }

        h3 {
            margin-top: 0px;
            margin-bottom: 0px;
            margin-left: 24px;
        }
    }
}

</style>