import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  shopListMethod,
  shopItemMethod,
  addCartByIdMethod,
  addShopCountMethod,
  removeCarShopByIdMethod
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
    cartCounts: []  // 存放添加商品的数量
  },
  getters: {
    cartCountsTransObj (state) {
      let o = {};
      state.cartCounts.forEach( (item) => {
        o[item.skuId] = item;
      })
      
      return o
    },
    smallCartAddCounts (state, getters) {
      let smallCart = state.smallCart;
      let cartCounts = getters.cartCountsTransObj;
      smallCart.forEach((item) => {
        Vue.set(item,'count', cartCounts[item.id] && cartCounts[item.id].count || 1)
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
    changeSmallCartFilter (state) {
      /// 要过滤一层，为了删除
      let newShops = state.smallCart.filter((item) => {
        return !!state.cartCounts.find(item2 => item.id == item2.skuId)
      });
      
      state.smallCart = newShops
    },
    changeSmallCart(state, payload) {  // payload 是一个数组 list
      state.smallCart = state.smallCart.concat(payload.list)
    },
    changeCarCounts(state, payload) {
      state.cartCounts = payload.cartCounts
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
      let item = state.cartCounts.find(item => item.skuId == skuId)
      let isExist = !!item;

      // 这个地方需要重构

      if (!item){  // 存在说明已经发过了 只需要告诉后端商品和数量
        item = {
          skuId,
          count: 0
        }
      }

      item = {
        ...item,
        count: paylod.minus ? --item.count : ++item.count
      }
      
      dispatch('addShopCountAction', item)
      .then((data) => {
        commit('changeCarCounts', {
          cartCounts: data.data.idsList
        })
        if( !isExist ) {  // 如果不存在，则请求商品信息
          dispatch('addCartByIdAction', {ids: [skuId]})
        }
        
      })

    },
    // 发送和获取商品数量的action
    addShopCountAction ({commit}, payload) {
      return addShopCountMethod(payload)
    },
    getCarShopsLoding ({commit, dispatch}) {  // 一加载就获取加入购物车的商品数量
      dispatch('addShopCountAction')
      .then( (data) => {
        let idsList = data.data.idsList;
        if(idsList.length === 0){
          return;
        }
        
        commit('changeCarCounts', {
          cartCounts: idsList
        })
        dispatch('addCartByIdAction',{
          ids: idsList.map((item) => {
            return item.skuId
          })
        })
      })
    },
    // 添加到小购物车中
    addCartByIdAction ({ commit }, paylod) {
      let idsStr= paylod.ids.join(',');
      addCartByIdMethod(idsStr).then((data) => {
        let d = data.data
        if(d.code === 0){
          commit('changeSmallCart', {list: d.data.list})
        }
        
      })
    },
    // 删除小购物车商品
    removeCarShopAction ({commit}, payload) {
      removeCarShopByIdMethod(payload.skuId).then((data) => {
        commit('changeCarCounts', {
          cartCounts: data.data.idsList
        })
        commit('changeSmallCartFilter')
      })
    }
  }
})

export default store
