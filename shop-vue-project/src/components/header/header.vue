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
          <li><a href="javascript:;">在线商城</a></li>
        </ul>
      </div>
    </div>
    <div class="nav-sub" style="display: none;">
      <div class="nav-sub-wrapper">
        <div class="container">
          <ul class="nav-list">
            <li><a href="javascript:;">首页</a></li>
            <li><a href="javascript:;">手机</a></li>
            <li><a href="javascript:;">“足迹系列”手感膜</a></li>
            <li class="active"><a href="javascript:;">官方配件</a></li>
            <li><a href="javascript:;">周边产品</a></li>
            <li><a href="javascript:;">第三方配件</a></li>
            <li><a href="javascript:;">全部商品</a></li>
            <li><a href="javascript:;">服务</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import smallCar from './small-car/smallCar'
  export default {
    components: {
      smallCar
    }
  }
</script>
<style src="./style.css"></style>

