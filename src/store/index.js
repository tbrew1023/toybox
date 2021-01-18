import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalContext: 'Exports',
    timezone: 'UTC',
    exporting: false,
    exportComplete: false
  },
  mutations: {
    updateModal: (state, context) => { state.modalContext = context },
    updateTimezone: (state, timezone) => { state.timezone = timezone },
    exportURL: (state, downloadURL) => { state.downloadURL = downloadURL },
    exportComplete: (state) => { state.exportComplete = true },
    exporting: state => { state.exporting = true },
  },
  actions: {
  },
  modules: {
  }
})
