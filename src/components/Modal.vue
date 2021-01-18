<template>
<div class="modal-container">
    <div class="modal-top"><h3>{{ title }}</h3><div @click="handleModalExit()" class="modal-exit">X</div></div>
    <div class="modal-bottom">
        <div v-if="modalContext == 'Settings'" class="settings-container">
            <ul>
                <!--li class="settings-item">
                    <h4>Dark Mode</h4>
                    <input type="checkbox" />
                </li-->
                <li class="settings-item">
                    <h4>Timezone</h4>
                    <select @change="handleTimezoneChange" name="timezones" id="timezones">
                        <option value="PST">PST</option>
                        <option value="CST">CST</option>
                        <option value="EST">EST</option>
                    </select>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import store from '../store';

export default {
    name: 'Modal',
    data() {
        return {
            child_component: 'child'
        }
    },
    props: {
        title: {
            type: String,
            default: 'Modal Title'
        }
    },
    mounted() {

    },
    computed: {
        modalContext() {
            return store.state.modalContext;
        }
    },
    methods: {
        handleModalExit() {
            console.log('exiting modal...');
        },
        handleTimezoneChange(e) {
            console.log('changing timezone to ' + e.target.value);
            store.commit('updateTimezone', e.target.value);
        }
    }
}
</script>

<style lang="scss" scoped>

.settings-container {
    background: white;
    height: 100%;
    width: 100%;

    ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;

        .settings-item {
            background: #f6f6f6;
            width: 95%;
            height: 60px;
            margin-top: 18px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            //cursor: pointer;

            input, select {
                margin-right: 24px;
            }

            h4 {
                margin-left: 24px;
                margin-top: 0px;
                margin-bottom: 0px;
            }
        }
    }
}

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

    .modal-bottom {
        background: white;
        height: 100%;
        width: 100%;
        border-radius: 0px 0px 8px 8px;
    }
}

</style>