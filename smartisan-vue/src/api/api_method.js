
import Axios from 'axios'

let baseUrl = 'https://www.easy-mock.com/mock/5a017c1debd5c518f747ca27/'

// 拼接地址
function resolvePath (path) {
  return baseUrl + path
}

let urls = {
  shopListUrl: '/api/shop_list',
  shopItemUrl: '/api/shop_item'
}

/* 请求商品列表的方法 */

export function shopListMethod () {
  return Axios.get(resolvePath(urls.shopListUrl))
}

/**
 * @param {Number} id 根据id获取商品数据
 */

export function shopItemMethod (id) {
  return Axios.get(resolvePath(urls.shopItemUrl), {params: {id}})
}
