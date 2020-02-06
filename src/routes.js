/* eslint-disable global-require */
import VueRouter from 'vue-router'
// import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'home',
    component: require('./components/home.vue'),
  },
  {
    path: '*',
    redirect: {
      name: 'home',
    },
  },
]
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active',
  
})

export default router
