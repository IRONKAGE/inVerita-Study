import http from './http'
import store from '../store'

// Post methods
export const create = (options) => {
  return http.post('/post', options)
}

// Get methods
export const getAll = () => {
  return http.get('/posts')
}
  