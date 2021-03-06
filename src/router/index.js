import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/map',
      name: 'map',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'index',
      component: HelloWorld
    }
  ]
})
