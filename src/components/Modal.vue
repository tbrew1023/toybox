<template>
<div class="modal-container">
    <div class="modal-top"><h3>{{ title }}</h3><div @click="handleModalExit()" class="modal-exit">X</div></div>
    <div class="modal-bottom">
        <div v-if="modalContext == 'Settings'" class="modal-content-container">
            <ul>
                <li class="settings-item">
                    <h4>Dark Mode</h4>
                    <input type="checkbox" />
                </li>
                <!--li class="settings-item">
                    <h4>Timezone</h4>
                    <select @change="handleTimezoneChange" name="timezones" id="timezones">
                        <option value="PST">PST</option>
                        <option value="CST">CST</option>
                        <option value="EST">EST</option>
                    </select>
                </li-->
            </ul>
        </div>
        <div v-if="modalContext == 'Messages'" class="modal-content-container">
            <ul>
                <li class="message-item">
                    <div class="msg-container">
                        <div class="sender-photo"></div>
                        <div class="msg-content-container">
                            <p class="msg-from">Trent Brew</p>
                            <p class="msg-content">Hello from Chicago!</p>
                        </div>
                    </div>
                    <div @click="handleMsgReply()" class="reply-btn">Reply</div>
                </li>
            </ul>
        </div>
        <div v-if="modalContext == 'Notifications'" class="modal-content-container">
            <ul>
                <li class="notification-item">
                    <div class="msg-container">
                        <div class="notification-photo"></div>
                        <div class="msg-content-container">
                            <p class="msg-from">Student Score Added</p>
                            <p class="msg-content">You successfully added score of 'score' for 'student'</p>
                        </div>
                    </div>
                    <div @click="handleMsgReply()" class="reply-btn">Dismiss</div>
                </li>
            </ul>
        </div>
        <div v-if="modalContext == 'Exports'" class="modal-content-container">
            <ul>
                <li class="no-exports" v-if="dbExports.length == 0">No exports</li>
                <li v-for="(dbExport, index) in dbExports" :key="index" class="notification-item" :class="(index == 0 ? 'latest' : '' )">
                    <div class="msg-container">
                        <div class="notification-photo"></div>
                        <div class="msg-content-container">
                            <p class="msg-from">Created on {{ dbExport.dateCreated }}</p>
                            <p class="msg-content">{{ dbExport.filename }}</p>
                        </div>
                    </div>
                    <a class="export" :href="dbExport.downloadUrl"><div class="reply-btn">Download</div></a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import store from '../store';
import firebase from 'firebase';

export default {
    name: 'Modal',
    data() {
        return {
            dbExports: []
        }
    },
    props: {
        title: {
            type: String,
            default: 'Modal Title'
        }
    },
    mounted() {
        this.fetchExports();
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
        },
        handleMsgReply() {  
            alert('Handle message reply...');
        },
        fetchExports() {
            firebase.firestore().collection('exports').orderBy('timestamp').get().then((docs) => {
                docs.forEach((doc) => {
                    this.dbExports.push(doc.data());
                })
            }).catch(() => {
                    console.error('No exports to display');
            });
        }
    }
}
</script>

<style lang="scss" scoped>

@keyframes flash {
    to {
        background: transparent;
    }
}

.latest {
    background: #DDE4ED;
    animation: flash 1s ease forwards 300ms;
}

.no-exports {
    margin-top: 220px;
    opacity: 0.4;
}

.export {
    text-decoration: none;
}

.msg-container {
    display: flex;
    
    .msg-from {
        opacity: 0.4;
        font-size: 12px;
        text-align: left;
        margin: 0px 0px 0px 24px;
    }

    .msg-content {
        margin: 0px 0px 0px 24px;
        text-align: left;
    }
}

.modal-content-container {
    background: white;
    height: 100%;
    width: 100%;
    border-radius: 0px 0px 8px 8px;
    overflow: auto;
    padding-bottom: 24px;

    ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;

        .settings-item, .message-item, .notification-item {
            width: 95%;
            height: 60px;
            margin-top: 18px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            //cursor: pointer;

            .sender-photo {
                background: orange;
                height: 36px;
                width: 36px;
                margin-left: 18px;
                border-radius: 100%;
                background-size: cover;
                background-repeat: none;
                background-position: center;
                background-image: url('https://github.com/tbrew1023/icommon/blob/master/images/skaterboi.png?raw=true');
            }

            input, select {
                margin-right: 24px;
            }

            h4 {
                margin-left: 24px;
                margin-top: 0px;
                margin-bottom: 0px;
            }

            .reply-btn {
                background: #4671B1;
                padding: 6px 12px;
                margin-right: 18px;
                color: white;
                border-radius: 8px;
                cursor: pointer;
                transition: 200ms;

                &:hover {
                    transform: scale(0.95);
                }
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

/* width */
::-webkit-scrollbar {
  width: 8px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track { 
  border-radius: 10px;
  background: #ffffff;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #e0e0e0; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  //background: #gray; 
}

</style>