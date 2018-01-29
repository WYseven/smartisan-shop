<template>
  <div id="header">
    <div class="nav-global">
      <div class="container">
        <h1 class="nav-logo">
          <a href="javascript:;"></a>
        </h1>
        <ul class="nav-aside">
          <!--active-->
          <li class="nav-cart">
            <a href="javascript:;">购物车</a>
            <!--根据class改变颜色-->
            <span class="cart-empty-num cart-num">
              <i>0</i>
            </span>
            <div class="nav-cart-wrapper" style="display: none;">
              <div class="nav-cart-list">
                <!--购物车为空提示-->
                <div class="empty">
                  <h3>购物车为空</h3>
                  <p>您还没有选购任何商品，现在前往商城选购吧!</p>
                </div>
                <!--小购物车-->
                <div class="full">
                  <div class="nav-cart-items">
                    <ul>
                      <li class="clear">
                        <div class="cart-item js-cart-item cart-item-sell">
                          <div class="cart-item-inner">
                            <div class="item-thumb">
                              <img src="../../assets/img/goods/1.png">
                            </div>
                            <div class="item-desc">
                              <div class="cart-cell">
                                <h4>
                                  <a href="#/item/100027401">坚果 Pro 钢化玻璃保护膜（前屏用）</a>
                                </h4>
                                <p class="attrs">
                                  <span>透明</span>
                                </p>
                                <h6>
                                  <span class="price-icon">¥</span><span class="price-num">49</span><span class="item-num">x 1</span>
                                </h6>
                              </div>
                            </div>
                            <div class="del-btn">删除</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="nav-cart-total">
                    <p>共 <strong class="ng-binding">1</strong> 件商品</p>
                    <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">49</span></h5>
                    <h6>
                      <a ng-href="http://www.smartisan.com/shop/#/cart" class="nav-cart-btn" href="http://www.smartisan.com/shop/#/cart">去购物车</a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </li>
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
<style src="./style.css"></style>

