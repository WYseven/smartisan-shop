import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  shopListMethod,
  shopItemMethod
} from '@/api/api_method'

/**
 * 错误处理
 */
function error (error) {
  throw new Error(error)
}

let store = new Vuex.Store({
  state: {
    shopList: {},  // 商品列表
    shopItem: {}   // 指定id的商品
  },
  mutations: {
    changeShopListValue (state, payload) {
      state.shopList = payload.shop_list
    },
    changeShopItemValue (state, payload) {
      state.shopItem = payload.shop_item
    }
  },
  actions: {
    // 获取商品列表数据
    shopListDataAction ({commit}) {
      shopListMethod().then((data) => {
        commit('changeShopListValue', data.data)
      }).catch(error)
    },
    shopItemByIdAction ({ commit }, paylod) {
      shopItemMethod(paylod.id).then((data) => {
        commit('changeShopItemValue', data.data)
      }).catch(error)
    }
  }
})

export default store
