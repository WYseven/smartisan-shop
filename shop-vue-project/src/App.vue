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
  watch:{
    $route:{
      handler(){
        // 判断是不是购物车，是购物车小购物车要隐藏
         this.$store.commit('updateLoading',{loading:true})
         this.$store.commit('updateCar',{show: this.$route.name !== 'car'})
      },
      immediate: true
    },
    '$store.state.smallCarList'(){
      localStorage.setItem('miaov-shop',JSON.stringify(this.$store.state.smallCarList))
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
/* 
.sort-option{
    border-top: 1px solid #D8D8D8;
    color: #999;
}
.sort-option ul{
    height: 60px;
    line-height: 60px;
}
.sort-option li{
    position: relative;
    float: left;
    padding-left: 42px;
}
.sort-option li:first-child{
	padding-left: 9px;
}
.sort-option li:before{
	content: ' ';
    display: block;
    position: absolute;
    left: 20px;
    top: 50%;
    width: 2px;
    height: 2px;
    margin-top: -1px;
    background: #C7C7C7;
}
.sort-option li:first-child:before{
	display: none;
}
.sort-option a{
	display: block;
    font-size: 12px;
    color: #999;
}
.sort-option a.active, .sort-option a:hover{
    color: #5683EA;
} */
.nav-global .nav-list .router-link-active {
  color: #fff;
}
</style>


