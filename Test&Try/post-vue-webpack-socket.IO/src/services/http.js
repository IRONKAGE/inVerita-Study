import axios from 'axios'
import store from '../store'

let http = axios.create({ baseURL: 'http://localhost:8081/'})

http.interceptors.request.use(config => {
  const token = store.state.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default http