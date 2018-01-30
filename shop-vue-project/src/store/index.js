import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    smallCarList:[]
  },
  mutations: {
    updatedSmallCarList(state,payload){ //{list:{}}
      let item = state.smallCarList.find(item => item.id === payload.list.id)
      let index = state.smallCarList.findIndex(item => item.id === payload.list.id)
      if(item){
        //state.smallCarList.push(payload.list)
        state.smallCarList.splice(index,1,{
          ...item,
          count: ++item.count
        })
      }else{
        payload.list.count = 1;
        state.smallCarList.push(payload.list)
      }
    }
  }
})