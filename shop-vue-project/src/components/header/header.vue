<template>
  <div id="header">
    <div class="nav-global">
      <div class="container">
        <h1 class="nav-logo">
          <!--<a href="javascript:;"></a>-->
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
          <li><router-link to="/">在线商城</router-link></a></li>
        </ul>

        <ul class="nav-list" style="float:right;">
          <li style="background:#fff; border-radius:50%;width:30px;height:30px;overflow:hidden;">
            <a href="https://github.com/WYseven/smartisan-shop" _target='blank' style="padding:0px;">
              <img style="width:30px;height:30px;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4=" alt="">
            </a>
          </li>
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
          let id = this.$route.query.id;
          //设置title
          let item = this.navDate.find(item => item.query.id == id);
          if(item){
            document.title = item.title;
          }
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

