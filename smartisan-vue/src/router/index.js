import Vue from 'vue'
import Router from 'vue-router'

import ShopList from '@/views/shop-list/shop-list'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/shop',
      name: 'ShopList',
      component: ShopList
    }
  ]
})
