import Vue from 'vue'
import Router from 'vue-router'

const ShopList = () => import('@/views/shop-list/shopList')
const ShopCar = () => import('@/views/shop-car/ShopCar') 
const shopDetails = () => import('@/views/shop-details/shopDetails')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: {
        path: '/list',
        query:{
          id: 62
        }
      }
    },
    {
      path: '/list',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/car',
      name: 'car',
      component: ShopCar
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: shopDetails
    }
  ]
})
