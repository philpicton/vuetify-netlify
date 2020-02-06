import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes'
Vue.config.productionTip = false

Vue.router = router

new Vue({
  vuetify,
  router,
  data() {
    return {
      drawer: false,
      items: [
        {
          href: 'home',
          router: true,
          title: 'Home',
          icon: 'home',
        },
      ],
    }
  },




  render: h => h(App)
}).$mount('#app')
