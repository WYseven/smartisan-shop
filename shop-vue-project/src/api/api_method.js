import Axios from 'axios'

const instance = Axios.create({
  baseURL: baseUrl
})

/**
 * 获取商品列表
 * @param {Object} [params={ page_size:20, page:1 }] 获取商品列表的参数
 * @param {Number} params{}.page_size 商品的数量
 * @param {Number} params{}.page      页数
 * @param {Number} params{}.id      一整块的id
 */

export function getShopList(params = { page_size: 20, page: 1, id: 60 }) {
  return instance.get('/shop_list', { params: params })
}

/**
 * 商品列表种商品的具体信息
 * @param {Object} [params={ ids:'',with_stock:true }] 获取商品列表的参数
 * @param {Number} params{}.ids 商品的id,可以写多个，以逗号隔开
 * @param {Number} params{}.with_stock 是否需要知道有货
 */

export function getShopInfoByIds(params = { ids: '', with_stock: true }) {
  return instance.get('/shop_skus', { params: params })
}

/**
 * 获取商品详情，包含父类所有商品信息
 * @param {Object} [params={ id:'' }] 获取商品列表的参数
 * @param {Number} params{}.id 商品的id, 必填项
 */

export function getShopDetail(params = { id: '' }) {
  return instance.get('/shop_detail', { params: params })
}

