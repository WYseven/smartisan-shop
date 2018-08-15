<template>
  <div id="app">
    <custom-header></custom-header>
    <div class="main">
      <loading v-show="$store.state.loading"></loading>
      <router-view v-cloak  v-show="!$store.state.loading"/>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/header/header'
import loading from '@/components/loading/loading'

export default {
  created () {
    // 页面一加载，先取拿小购物的数据
    this.$store.dispatch('shopListAction')
  },
  watch:{
    $route:{
      handler(){
        // 判断是不是购物车，是购物车小购物车要隐藏
         this.$store.commit('updateCar',{show: this.$route.name !== 'car'})
      },
      immediate: true
    },
    '$store.state.smallCarList': {
      handler(){
        let smallCarList = this.$store.state.smallCarList;
        // 存入商品的信息到localStorage中
        // smallCarList: [{id:1},{id:2}]
        // {id:{id,count},id2:{id,count}}
        let info = smallCarList.reduce((obj,item) => {
          obj[item.id] =  {
              checked: item.checked,
              count:item.count,
              id: item.id
            }
          return obj;
        },{})
        localStorage.setItem('miaov-shop-info',JSON.stringify(info))
      },
      deep: true
    }
  },
  components: {
    CustomHeader,
    loading
  },
  name: 'App'
}
</script>
<style src= './assets/css/reset.css'></style>
<style>
.main {
  padding-top: 20px;
}
[v-cloak] {
  display: none;
}
.nav-global .nav-list .router-link-active {
  color: #fff;
}
</style>


