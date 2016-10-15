import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth'

import Tasks from '../components/Tasks'
import Projects from '../components/Projects'
import AuthPage from '../components/auth/Auth'
import NotFound from '../components/error/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { path: '/tasks' } },
    { path: '/tasks', component: Tasks, meta: { requiresAuth: true } },
    { path: '/projects', component: Projects },
    { path: '/authenticate', component: AuthPage },
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.user.authenticated) {
      next({
        path: '/authenticate'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router