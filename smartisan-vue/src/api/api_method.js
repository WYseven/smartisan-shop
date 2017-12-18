
import Axios from 'axios'
// 存放所有商品的id，可以把这一块放在后端
import ids from './mock-ids'

let baseUrl = 'http://118.89.226.84:8080'

// 拼接地址
function resolvePath (path) {
  return baseUrl + path
}

let urls = {
  shopListUrl: '/api/shop_list',
  shopItemUrl: '/api/shop_item',
  addCartUrl: '/api/add_cart'
}

/* 请求商品列表的方法 */

export function shopListMethod () {
  return Axios.get(baseUrl+'/api/shop_list')
}

/**
 * @param {Number} id 根据id获取商品数据
 */

export function shopItemMethod(id) {
  return Axios.get(baseUrl+'/api/shop_details', { params: { id } })
}

/**
 * @param {String} id 为一类商品的父id
 * @param {Array} specJson 根据数组中的每一项得到匹配到的id
 */

export function getShopItemId(parentId, specJson) {
  let skuItem = ids.find((item) => {
        return item.id == parentId.id
      })
  console.log(skuItem)
  if (skuItem){
    // 判断specJson中的每一项在不在skuItem.spec_json中的每一项中
  }
}

/**
 * 添加到购物车的数量
 * @param {Object} shopId 添加到购物车的id
 */
export function addShopCountMethod(obj) {
  
    // 暂无接口
    
    return Axios.get(baseUrl+'/api/count', { params: {...obj}})
  }

/**
 * 添加到购物车
 * @param {String} shopId 添加到购物车的id
 */
export function addCartByIdMethod(skuId='') {
  
    // 暂无接口
  
    return Axios.get(baseUrl+'/api/add_car', { params: {skuId}})
  }

  /**
 * 根据id删除购物车商品
 * @param {String} shopId 
 */
export function removeCarShopByIdMethod(skuId='') {
  
    // 暂无接口
  
    return Axios.get(baseUrl+'/api/remove_count', { params: {skuId}})
  }
