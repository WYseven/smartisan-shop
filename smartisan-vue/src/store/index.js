import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  shopListMethod,
  shopItemMethod,
  addCartByIdMethod
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
    shopItem: {},   // 指定id的商品
    smallCart: [],
    cartCounts: {},  // 存放添加商品的数量
    arr: []
  },
  mutations: {
    changeShopListValue (state, payload) {
      state.shopList = payload.shop_list
    },
    changeShopItemValue (state, payload) {
      state.shopItem = payload.shop_item
    },
    changeSmallCart(state, payload) {
      state.smallCart.push(payload)
    },
    changeCarCounts(state, payload) {

      state.arr.push(payload)

      if (payload.isExist){
        let item = state.cartCounts[payload.skuId];
        Vue.set(state.cartCounts, payload.skuId, {
          skuId: payload.skuId,
          count: ++item.count
        });
      }else{
        state.cartCounts[payload.skuId] = payload;
      }
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
    },
    // 发送商品的数量
    addCartByCountAction({ commit, dispatch, state }, paylod) {
      let skuId = paylod.skuId;

      let item = state.cartCounts[skuId]

      if (item){  // 存在说明已经发过了 只需要告诉后端商品和数量
        commit('changeCarCounts', {
          skuId,
          isExist: true
        })
      }else{ // 没有存在说明没发过 告诉后端商品和数量，同时得到商品信息
        commit('changeCarCounts', {
          skuId,
          count: 1
        })
        
        dispatch('addCartByIdAction', { skuId })
      }
    },
    // 添加到小购物车中
    addCartByIdAction ({ commit }, paylod) {
      addCartByIdMethod(paylod.skuId).then((data) => {
        let d = data.data
        if(d.code === 0){
          commit('changeSmallCart', d.data.list[0])
        }
        
      })
    }
  }
})

export default store
