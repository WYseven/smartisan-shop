import Vue from 'vue'
import Router from 'vue-router'

import Shop from '@/views/shop'
import ShopList from '@/views/shop-list/shop-list'
import ShopCar from '@/views/shop-car/car'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      children: [
        {
          path: '',
          name: 'Shop',
          component: ShopList
        },
        {
          path: 'list',
          name: 'List',
          component: ShopList
        },
        {
          path: 'car',
          name: 'Car',
          component: ShopCar
        }
      ]
    }
  ]
})
