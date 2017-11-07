const url = 'http://localhost:3100'
import Axios from 'axios'

var jsonp = require('jsonp');

let backUrl = (path) => {
  return url + path
}

// 获取商品列表

export async function getList (data) {
  return await Axios.get(backUrl('/api/list'))
}
