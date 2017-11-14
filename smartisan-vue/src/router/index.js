import Vue from 'vue'
import Router from 'vue-router'

import Shop from '@/views/shop'
import List from '@/views/shop-list/shop-list'
import Item from '@/views/shop-item/item-view'

import Cart from '@/views/shop-cart/cart'

import Checkout from '@/views/checkout/checkout'

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
          path: 'list',
          name: 'List',
          component: List
        },
        {
          path: 'item/:id?',
          name: 'item',
          component: Item
        },
        {
          path: 'cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: Checkout
        }
      ]
    }
  ]
})
