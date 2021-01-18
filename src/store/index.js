import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalContext: 'Settings',
    timezone: 'UTC'
  },
  mutations: {
    updateModal: (state, context) => {
      state.modalContext = context;
    },
    updateTimezone: (state, timezone) => {
      state.timezone = timezone;
    }
  },
  actions: {
  },
  modules: {
  }
})
