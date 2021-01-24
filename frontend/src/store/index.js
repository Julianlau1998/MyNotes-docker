import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 0,
    localhost: '192.168.178.46:3000',
    userId: '',
    userEmail: '',
    userFirstName: '',
    userLastName: '',
    title: '',
    note: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
