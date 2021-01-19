import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalContext: 'Notifications',
    timezone: 'UTC',
    exporting: false,
    exportComplete: false,
    notifications: []
  },
  mutations: {
    updateModal: (state, context) => { state.modalContext = context },
    updateTimezone: (state, timezone) => { state.timezone = timezone },
    exportURL: (state, downloadURL) => { state.downloadURL = downloadURL },
    exportComplete: (state) => { state.exportComplete = true },
    exporting: state => { state.exporting = true },
    pushNotification: (state, notificationContext) => { state.notifications.push(notificationContext) },
    removeNotification: ( state, notificationIndex ) => { state.notifications.splice(notificationIndex, 1) },
    modalContext: (state, context) => { state.modalContext = context }
  },
  actions: {
  },
  modules: {
  }
})
