import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

// configure router
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const LOGIN = 'login'
  const INITIAL_PAGE = 'dashboard'
  const authenticate = store.getters.getAuth

  if (authenticate) {
    //para /login
    if (to.name === 'login') {
      next({ name: INITIAL_PAGE })
    }
    //para /* =! de /login
    next()
  } else {
    //para /* =! de /login
    if (to.name !== LOGIN) {
      next({ name: LOGIN })
    }
    //para /login
    next()
  }
})

export default router
