import Vue from 'vue'
import Vuex from 'vuex'
import { getShopInfoByIds } from '@/api/api_method'
Vue.use(Vuex)

let info = JSON.parse(localStorage.getItem('miaov-shop-info')) || []

export default new Vuex.Store({
  state: {
    smallCarList: [],  // 存放小购物车数据 未来数据也可以在大购物车使用
    isCar: false,
    loading: true,
    addCarShowSmallCar: false  // 当添加到购物车，则需要展开小购物车
  },
  getters:{
    // 计算购物车商品的总价
    totalCountAddPrice(state){
      return state.smallCarList.reduce((item1,item2) => {
        return {
          count: item1.count + item2.count,
          price: item1.price + item2.count * item2.price
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
    //在商品列表页添加购物车commit这个mutation
    updatedSmallCarList(state,payload){ //{list:{id:1}}
      let index = state.smallCarList.findIndex(item => item.id === payload.list.id)
      // [{id:1,count:30},{id:2,count:1}]
      if (index !== -1){
        let item = state.smallCarList[index];
        state.smallCarList.splice(index,1,{
          ...item,
          count: payload.minus ? --item.count : ++item.count
        })
      }else{
        payload.list.count = 1;
        state.smallCarList.push(payload.list)
      }
    },
    // 初次获取小购物车所有的数据
    replaceSmallCarList(state, payload) { // {list:[]}
      state.smallCarList = payload.list;
    },
    // 删除购物车商品，大小购物车通用的
    removeSmallCarListById(state,payload){ //{id}
      let index = state.smallCarList.findIndex(item => item.id === payload.id)
      if (index !== -1) state.smallCarList.splice(index, 1);
    },
    updatedSmallCarListChecked(state, payload) {
      let index = state.smallCarList.findIndex(item => item.id === payload.id)
      if (index !== -1) {
        let item = state.smallCarList[index];
        state.smallCarList.splice(index, 1, {
          ...item,
          checked: !item.checked
        })
      }
    },
    // 更新购物车商品全选和全部不选
    updatedSmallCarListAllChecked(state, payload) {
      state.smallCarList.forEach(item => item.checked = payload.checked)
    },
    updateCar(state,payload){  // 如果是在购物车，小购物车则不显示
      state.isCar = payload.show;
    }
  },
  actions: {
    // 获取商品购物车数据
    shopListAction ({commit,state}) {
      let ids = Object.keys(info).join(',')
      getShopInfoByIds({ ids: ids}).then((res) => {

        let list = res.data.list
        
        list.forEach(item => item.count = info[item.id].count)
        list.forEach(item => item.checked = info[item.id].checked)
        commit('replaceSmallCarList', { list: list})
      })
    },

    // 添加到购物车
    addCar({ commit, state },payload){
      
    }
  }
})