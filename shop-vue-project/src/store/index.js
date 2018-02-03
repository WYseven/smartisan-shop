import Vue from 'vue'
import Vuex from 'vuex'
import { getShopInfoByIds } from '@/api/api_method'
Vue.use(Vuex)

let info = JSON.parse(localStorage.getItem('miaov-shop-info')) || []

export default new Vuex.Store({
  state: {
    smallCarList: [],
    isCar: false,
    loading: false,
    addCarShowSmallCar: false  // 当添加到购物车，则需要展开小购物车
  },
  getters:{
    totalCountAddPrice(state){
      return state.smallCarList.reduce((item1,item2) => {
        return {
          count: item1.count + item2.count,
          price: item1.count * item1.price + item2.count * item2.price
        }
      },{
        count:0,
        price:0
      })
    }
  },
  mutations: {
    updateLoading(state, payload) {
      state.loading = payload.loading;
    },
    // 控制小购物车显示隐藏
    updatedShow(state, payload){
      state.addCarShowSmallCar = payload.show;
    },
    updatedSmallCarList(state,payload){ //{list:{}}
      let item = state.smallCarList.find(item => item.id === payload.list.id)
      let index = state.smallCarList.findIndex(item => item.id === payload.list.id)
      if(item){
        state.smallCarList.splice(index,1,{
          ...item,
          count: payload.minus ? --item.count :  ++item.count
        })
      }else{
        payload.list.count = 1;
        state.smallCarList.push(payload.list)
      }
    },
    // 初次获取小购物车所有的数据
    replaceSmallCarList(state, payload) {
      state.smallCarList = payload.list;
    },
    removeSmallCarListById(state,payload){ //{id}
      let index = state.smallCarList.findIndex(item => item.id === payload.id)
      if(index !== -1){
        state.smallCarList.splice(index,1);
      }
    },
    updatedSmallCarListChecked(state, payload) {
      let item = state.smallCarList.find(item => item.id === payload.id)
      if (item) {
        item.checked = !item.checked;
      }
    },
    updatedSmallCarListAllChecked(state, payload) {
      state.smallCarList.forEach(item => item.checked = payload.checked)
    },
    updateCar(state,payload){  // 如果是在购物车，则不显示
      state.isCar = payload.show;
    }
  },
  actions: {
    // 获取商品购物车数据
    shopListAction ({commit,state}) {
      let ids = Object.keys(info).join(',')
      getShopInfoByIds({ ids: ids}).then((res) => {

        let list = res.data.data.list
        
        list.forEach(item => item.count = info[item.id].count)
        
        commit('replaceSmallCarList', { list: list})
      })
    }
  }
})