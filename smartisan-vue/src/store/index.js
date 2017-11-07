import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  shopListMethod
} from '../api/api_method'

let store = new Vuex.Store({
  state: {
    shopList: {}  // 商品列表
  },
  mutations: {
    changeShopListValue (state, payload) {
      state.shopList = payload.shop_list
    },
    setShopCarList (state, payload) {
      state.shopCarList = payload.data.car_list
    }
  },
  actions: {
    // 获取商品列表数据
    getShopListDataAction ({commit}) {
      shopListMethod().then((data) => {
        commit('changeShopListValue', data.data)
      })
    }
  }
})

export default store
