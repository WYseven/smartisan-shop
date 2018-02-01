<template>
  <div id="header">
    <div class="nav-global">
      <div class="container">
        <h1 class="nav-logo">
          <a href="javascript:;"></a>
        </h1>
        <ul class="nav-aside">
          <!--active-->
          <small-car></small-car>
        </ul>
        
        <ul class="nav-list">
          <li><a href="http://miaov.com/">首页</a></li>
          <li><a href="http://miaov.com/index.php/Course/courseList">课程</a></li>
          <li><a href="http://2017.miaov.com/study">视频学习</a></li>
          <li><a href="http://2017.miaov.com/study/remote/index">尊享视频</a></li>
          <li><a href="http://2017.miaov.com/bbs">社区</a></li>
          <li><a href="http://www.miaov.com/index.php/example/exampleList">学员作品</a></li>
          <li><router-link to="/list?id=60">在线商城</router-link></a></li>
        </ul>
      </div>
    </div>
    <div class="nav-sub" v-show='hide'>
      <div class="nav-sub-wrapper">
        <div class="container">
          <ul class="nav-list" :a='$route.name'>
            <router-link 
              :class="{active: $route.query.id == item.query.id}" 
              :a="item.name"
              v-for="item in navDate" 
              :key="item.query.id" :to="item" tag="li"
            >
              <a>{{item.title}}</a>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let navDate = [
  {
    name: 'ShopList',
    query: {id:62},
    title: '全部'
  },
  {
    name: 'ShopList',
    query: {id:69},
    title: '品牌周边'
  },
  {
    name: 'ShopList',
    query: {id:61},
    title: '第三方商品'
  },
  {
    name: 'ShopList',
    query: {id:60},
    title: '官方配件'
  }
]
  import smallCar from './small-car/smallCar'
  export default {
    data () {
      return {
        navDate,
        hideNavName: ['car'],
        hide: false
      }
    },
    watch: {
      $route: {
      handler() {
         let name = this.$route.name;
         this.hide = this.hideNavName.indexOf(name) === -1;
      },
      immediate: true
      }
    },
    components: {
      smallCar
    }
  }
</script>
<style src="./style.css"></style>

