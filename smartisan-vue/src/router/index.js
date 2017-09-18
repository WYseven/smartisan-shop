import Vue from 'vue'
import Router from 'vue-router'
import ShopList from '@/views/shop-list/shop-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShopList',
      component: ShopList
    }
  ]
})
