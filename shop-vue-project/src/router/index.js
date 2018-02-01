import Vue from 'vue'
import Router from 'vue-router'

const ShopList = () => import('@/views/shop-list/shopList')
const ShopCar = () => import('@/views/shop-car/ShopCar') 
const shopDetails = () => import('@/views/shop-details/shopDetails')

Vue.use(Router)

const router = new Router({
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
      title:'商品列表',
      component: ShopList
    },
    {
      path: '/car',
      name: 'car',
      component: ShopCar,
      meta: {title:'我的购物车'}
    },
    {
      path: '/detail/:id',
      name: 'detail',
      title:'商品详情',
      component: shopDetails
    }
  ]
})

router.beforeEach((to,from,next) => {

  document.title = to.meta.title;

  next();
})

export default router
