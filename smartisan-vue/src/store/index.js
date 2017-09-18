import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    shopList: {}
  },
  mutations: {
    changeShopListValue (state, payload) {
      console.log(payload.shopList)
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
    }
  }
})

export default store
