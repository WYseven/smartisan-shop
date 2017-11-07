
import Axios from 'axios'

let baseUrl = 'https://www.easy-mock.com/mock/5a017c1debd5c518f747ca27/api/'

// 拼接地址
function resolvePath (path) {
  return baseUrl + path
}

let urls = {
  shop_list_url: 'shop_list'
}

/* 请求商品列表的方法 */

export function shopListMethod () {
  console.log(resolvePath(urls.shop_list_url))
  return Axios.get(resolvePath(urls.shop_list_url))
}
