import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/logout',
      name: 'logout',
      component: require('@/components/Forms/Logout').default
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: require('@/components/Tasks').default
    },
    {
      path: '/g-:taskId',
      name: 'game',
      component: require('@/components/Game').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})