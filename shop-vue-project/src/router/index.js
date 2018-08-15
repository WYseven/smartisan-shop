import Vue from 'vue'
import Router from 'vue-router'

const ShopList = () => import('@/views/shop-list/shopList')
const ShopCar = () => import('@/views/shop-car/ShopCar') 
const shopDetails = () => import('@/views/shop-details/shopDetails')
const Login = () => import('@/components/login')
const Register = () => import('@/components/register')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: {
        path: '/list',
        query:{  // 'list?id=62'  queryString
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
      title: '商品详情',
      component: shopDetails
    },
    {
      path: '/login',
      name: 'login',
      title: '登录页面',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      title: '登录页面',
      component: Register
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to,from,next) => {
  document.title = to.meta.title || '购物商城--st';
  next();
})

export default router
