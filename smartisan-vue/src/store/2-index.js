import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  shopListMethod,
  shopItemMethod,
  addCartByIdMethod,
  addCartByCountMethod
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
    cartCounts: {}  // 存放添加商品的数量
  },
  getters: {
    smallCartAddCounts (state) {
      let smallCart = state.smallCart;
      let cartCounts = state.cartCounts;
      
      smallCart.forEach((item) => {
        item.count = cartCounts[item.id].count
      })

      return smallCart
    },
    computedCountsAddPric (state, getters) {
      let smallCartAddCounts = getters.smallCartAddCounts;
      return  smallCartAddCounts.reduce((obj, item) => {
                let price = parseInt(item.count) * parseInt(item.price)
                return {
                  prices: obj.prices + price,
                  counts: obj.counts + parseInt(item.count)
                }
              }, {
                prices: 0,
                counts: 0
              })
    }
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

      if (payload.isExist){
        
        let item = state.cartCounts[payload.skuId];
        state.cartCounts = Object.assign(state.cartCounts, {
          [payload.skuId]: Object.assign(item,{
            count: ++item.count
          })
        })
        
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
    cartByIdAddCountAction({ commit, dispatch, state }, paylod) {
      let skuId = paylod.skuId;

      let item = state.cartCounts[skuId]

      // 这个地方需要重构

      if (item){  // 存在说明已经发过了 只需要告诉后端商品和数量
        commit('changeCarCounts', {
          skuId,
          isExist: true
        })
        dispatch('addCartByCountAction', state.cartCounts[skuId])
      }else{ // 没有存在说明没发过 告诉后端商品和数量，同时得到商品信息
        commit('changeCarCounts', {
          skuId,
          count: 1
        })

        dispatch('addCartByCountAction', state.cartCounts[skuId])
        .then(function(){
          dispatch('addCartByIdAction', { ids: [skuId] })
        })
      }
    },
    // 发送和获取商品数量的action
    addCartByCountAction ({commit}, payload) {
      addCartByCountMethod(payload)
      .then((data) => {
        let list = data.data;
        list.forEach((item) => {
          commit('changeCarCounts', item)
        })
      });
    },
    getCarShopsLoading () {
      addCartByCountMethod(payload)
      .then((data) => {
        let list = data.data;
        list.forEach((item) => {
          commit('changeCarCounts', item)
        })
      });
    },
    // 添加到小购物车中
    addCartByIdAction ({ commit }, paylod) {
      let idsStr= paylod.ids.join(',');
      addCartByIdMethod(idsStr).then((data) => {
        let d = data.data
        if(d.code === 0){
          commit('changeSmallCart', d.data.list[0])
        }
        
      })
    }
  }
})

export default store
