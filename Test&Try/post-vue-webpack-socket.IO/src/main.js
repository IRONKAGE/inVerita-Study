import Vue from 'vue'
import App from './App'
import store from './store'
import router from './routes'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

let socketInstance = socketio('http://localhost:8081', { query: 'auth_token=' + store.state.token })

Vue.use(VueSocketio, socketInstance)
Vue.use(vuetify)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
