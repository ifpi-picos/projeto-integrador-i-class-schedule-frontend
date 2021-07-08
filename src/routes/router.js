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

// router.beforeEach((to, from, next) => {
//   const LOGIN = 'login'
//   const INITIAL_PAGE = 'dashboard'
//   Firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       if (to.name === 'login') {
//         next({ name: INITIAL_PAGE })
//       }
//       next()
//     } else {
//       if (to.name !== LOGIN && to.name !== 'register') {
//         next({ name: LOGIN })
//       }
//     }
//   })
//   next()
// })

router.beforeEach((to, from, next) => {
  const LOGIN = 'login'
  const INITIAL_PAGE = 'dashboard'
  const authenticate = store.getters.getAuth

  if (authenticate) {
    if (to.name === 'login') {
      next({ name: INITIAL_PAGE })
    }
    next()
  } else {
    if (to.name !== LOGIN) {
      next({ name: LOGIN })
    }
  }

  next()
})

export default router
