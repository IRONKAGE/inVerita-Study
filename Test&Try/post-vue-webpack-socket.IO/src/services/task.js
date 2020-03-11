import http from './http'

export const create = (options) => {
  return http.post('/task', options)
}

export const getById = (id) => {
  return http.get(`/task/${id}`)
}

export const getByAuthor = (author) => {
  return http.get(`/tasks/${author}`)
}

export const getAll = () => {
  return http.get('/tasks')
}