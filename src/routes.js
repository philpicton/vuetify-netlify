const routes = [
    {
        path: '/',
        name: 'home',
        component: require('./components/home.vue').default,
      },
      {
        path: '*',
        redirect: {
          name: 'home',
        },
      },  ]
  
export default routes