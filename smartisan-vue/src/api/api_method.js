
import Axios from 'axios'
// 存放所有商品的id，可以把这一块放在后端
import ids from './mock-ids'

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

export function shopItemMethod(id) {
  return Axios.get(resolvePath(urls.shopItemUrl), { params: { id } })
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

    let list = skuItem.sku_list_ids
    a:for (var i = 0; i < list.length; i++){
      let json = list[i].spec_json
      for (let j = 0; j < json.length; j++){
        // 通过测试
        console.log(specJson.some((item) => {
          console.log(item.spec_value_id, json[j].spec_value_id)
          return item.spec_value_id == json[j].spec_value_id
        }))
        if (!specJson.some((item) => item.spec_value_id == json[j].spec_value_id)){
          break;
        }else{
          console.log(j, json.length - 1)
          if(j === json.length-1){
            console.log(list[i])
            break a;
          }
        }
      }
    }

  }

}
