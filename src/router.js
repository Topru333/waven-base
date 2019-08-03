import Vue from 'vue'
import Router from 'vue-router'
import Builder from './components/pages/Builder.vue';
import Home from './components/Home.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/builder',
      name: 'Builder',
      component: Builder
    }
  ]
})
