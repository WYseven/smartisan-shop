<template>
  <div class="store-content hander-car">
    <div class="cart-box">
      <div class="title">
        <h2>购物清单</h2>
      </div>
      <div class="cart-inner">
        <!--没有购物提醒-->
        <div class="empty-label" :class="{hide:shopList.length}">
          <h3>您的购物车中还没有商品</h3>
          <router-link to="/" class="link">现在选购</router-link>
        </div>
        <!--没有购物车-->
        <div v-show='shopList.length'>
          <div class="cart-table-title">
            <span class="name">商品信息</span>
            <span class="operation">操作</span>
            <span class="subtotal">小计</span>
            <span class="num">数量</span>
            <span class="price">单价</span>
          </div>
          <div class="cart-table">
            <div class="cart-group">
              <!--购物列表-->
              <div class="cart-top-items">
                <div class="cart-items" v-for="item in shopList" :key="item.id">
                  <div class="items-choose">
                    <!--购物车的单选按钮-->
                    <span class="blue-checkbox-new" 
                      @click="toggle(item)" 
                      :class="{'checkbox-on': item.checked}">
                    </span>
                  </div>
                  <div class="items-thumb">
                    <!-- 点击图片，跳转到详情页 -->
                    <router-link :to="'/detail/'+item.id">
                      <img :src="item.shop_info.ali_image">
                    </router-link>
                  </div>
                  <div class="name hide-row" >
                    <div class="name-table">
                      <!-- 点击导航，跳转到详情页 -->
                      <router-link 
                        :to="'/detail/'+item.id"
                      >{{item.shop_info.title}}</router-link>
                      <ul class="attribute">
                        <!-- 生成规格 -->
                        <li 
                          v-for='option in item.shop_info.spec_json' 
                          :key="option.spec_id"
                        >
                          {{option.show_name}}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="operation">
                    <a class="items-delete-btn" @click="remove(item)"></a>
                  </div>
                  <div class="subtotal">¥ {{item.count * item.price}}.00</div>
                  <div class="item-cols-num">
                    <div class="select js-select-quantity">
                      <span class="down" :class="disableDown(item)" @click="minus(item)">-</span>
                      <span class="num">{{item.count}}</span>
                      <span class="up" :class="disableUp(item)" @click='add(item)'>+</span>
                    </div>
                  </div>
                  <div class="price">¥ {{item.price}}.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  v-show='shopList.length' class="cart-bottom-bg fix-bottom fix-bottom-fixed">
        <div class="cart-bar-operation">
          <div>
            <div class="choose-all js-choose-all" @click="toggleAll">
              <span class="blue-checkbox-new" :class="{'checkbox-on': isCheckedAll}"></span>
              全选
            </div>
            <div class="delete-choose-goods">删除选中的商品</div>
          </div>
        </div>
        <div class="shipping">
          <div class="shipping-box">
            <div class="shipping-total shipping-num">
              <h4 class="">
                已选择 <i>{{checkedLen}}</i> 件商品
              </h4>
              <h5>
                共计 <i >{{$store.getters.totalCountAddPrice.count}}</i> 件商品
              </h5>
            </div>
            <div class="shipping-total shipping-price">
              <h4 class="">
                应付总额：<span>￥</span><i>{{checkedCountAddPrice}}</i> 
              </h4>
              <h5 class="shipping-tips">
                应付总额不含运费
              </h5>
            </div>
          </div>
          <span class="jianguo-blue-main-btn big-main-btn js-checkout " :class="{'disabled-btn': !checkedLen}">
            <a href="javascript:;">现在结算</a>
          </span>
        </div>
      </div>
    </div>
    <Modal @ok="okRemove" v-model="show" >
      <p class="confirm-msg">您确认删除该商品吗？</p>
    </Modal>
  </div>
</template>
<script src="./shopCarJs.js"></script>
<style src="./shopCarStyle.css"></style>

