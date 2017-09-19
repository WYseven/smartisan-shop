import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    shopList: {},  // 商品列表
    shopCarList: [] // 小购物车列表
  },
  mutations: {
    changeShopListValue (state, payload) {
      state.shopList = payload.shopList
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
    setShopCarAsync ({commit}) {
      Axios.post(
        'http://localhost:3100/api/saveShopCar',
        {
          data: {
            carList: {a: 1}
          }
        }
      ).then((data) => {
        console.log(data)
      })
    }
  }
})

export default store
