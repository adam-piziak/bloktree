import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth'

import Tasks from '../components/tasks/TasksPage'
import Projects from '../components/projects/ProjectsPage'
import AuthPage from '../components/auth/Auth'
import NotFound from '../components/error/NotFound.vue'
import Main from '../components/Main.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      redirect: { path: '/tasks' },
      meta: { requiresAuth: true },
      children: [
        {
          path: 'tasks',
          component: Tasks
        },
        {
          path: 'projects',
          component: Projects
        }
      ]
    },
    {
      path: '/authenticate',
      component: AuthPage
    },
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
    next()
  }
})

export default router
