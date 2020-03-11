import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    username: null,
    token: null
  },
  mutations: {
    SET_USER (state, user) {
      state.username = user.username
      state.token = user.token
    },
    LOGOUT (state) {
      state.username = null
      state.token = null
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('SET_USER', user)
    },
    logout ({ commit}) {
      commit('LOGOUT')
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token
  }
})