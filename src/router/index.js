import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import map from '@/components/map'
import index from '@/components/index'

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
      component: map
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
