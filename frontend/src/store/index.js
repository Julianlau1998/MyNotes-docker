import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 0,
    // localhost: 'https://my-notes-backend-6mkbp.ondigitalocean.app',
    localhost: '139.162.158.148:3000',
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
