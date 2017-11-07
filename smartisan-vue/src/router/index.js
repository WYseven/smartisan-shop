import Vue from 'vue'
import Router from 'vue-router'

import Shop from '@/views/shop'
import List from '@/views/shop-list/shop-list'
import Item from '@/views/shop-item/item-view'

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
          path: '/item/:id?',
          name: 'item',
          component: Item
        }
      ]
    }
  ]
})
