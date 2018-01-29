<template>
  <div id="app">
    <custom-header></custom-header>
    <div class="sort-option" >
      <ul class="line clear" style="padding-left:30%;">
        <li><a href="javascript:;" class="active">测试跳转：</a></li>
        <router-link to="/" tag="li">
          <a>商品列表页</a>
        </router-link>
        <router-link to="/detail" tag="li">
          <a>商品详情页</a>
        </router-link>
        <router-link to="/car" tag="li">
          <a>购物车页</a>
        </router-link>
      </ul>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/header/header'
export default {
  components: {
    CustomHeader
  },
  name: 'App'
}
</script>
<style src= './assets/css/reset.css'></style>
<style>
.main {
  padding-top: 20px;
}

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
}
</style>


