import http from './http'
import store from '../store'

export const signUp = (credentials) => http.post('/signup', credentials)
export const signIn = (credentials) => http.post('/signin', credentials)
export const logout = () => store.dispatch('logout') 
