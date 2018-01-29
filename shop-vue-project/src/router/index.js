import Vue from 'vue'
import Router from 'vue-router'

import ShopList from '@/views/shop-list/shopList'
import ShopCar from '@/views/shop-car/ShopCar'
import shopDetails from '@/views/shop-details/shopDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/car',
      name: 'car',
      component: ShopCar
    },
    {
      path: '/detail',
      name: 'detail',
      component: shopDetails
    }
  ]
})
