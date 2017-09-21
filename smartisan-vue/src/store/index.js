import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    shopList: {},  // 商品列表
    shopCarList: [] // 小购物车列表
  },
  getters: {
    carShopTotalInfo (state) {
      let j = {
        totalNum: 0,
        totalPric: 0
      }
      state.shopCarList.reduce((prevValue, currentValue) => {
        prevValue.totalNum += currentValue.sku_num
        prevValue.totalPric += currentValue.price * currentValue.sku_num
        return prevValue
      }, j)
      return j
    }
  },
  mutations: {
    changeShopListValue (state, payload) {
      state.shopList = payload.shopList
    },
    setShopCarList (state, payload) {
      state.shopCarList = payload.data.car_list
    }
  },
  actions: {
    getShopDataAsync ({commit}) {
      Axios.get('http://localhost:3100/api/list').then((data) => {
        commit('changeShopListValue', {
          shopList: data.data
        })
      })
    },
    async setShopCarAsync ({commit}, payload) {
      return Axios.post(
        'http://localhost:3100/api/setShopCarList',
        {
          carList: JSON.stringify(payload)
        }
      ).then((data) => {
        if (data.data.code === 0) {
          commit('setShopCarList', data)
        }
        return data
      })
    },
    getShopCarList ({commit}) {
      Axios.get('http://localhost:3100/api/getShopCarList').then((data) => {
        commit('setShopCarList', data)
      })
    },
    removeCarShopByIdAsync ({commit}, payload) {
      Axios.post(
        'http://localhost:3100/api/removeCarShopById',
        {
          removeId: payload.id
        }
      ).then((data) => {
        commit('setShopCarList', data)
      })
    }
  }
})

export default store