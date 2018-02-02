<template>
  <div class="store-content item">
    <div class="item-box">
      <!--左侧轮播-->
      <tab :imgs="ali_images"></tab>
      <!--右侧信息-->
      <div class="banner">
        <div class="sku-custom-title">
          <div class="params-price">
            <span><em>¥</em><i>{{shopInfo.price}}</i></span>
          </div>
          <div class="params-info">
            <h4>{{shop_info.title}}</h4>
            <h6>{{shop_info.sub_title}}</h6>
          </div>
        </div>
        <div class="sku-dynamic-params-panel">
          <!--各种颜色、尺寸、型号-->
          <div class="sku-dynamic-params clear" v-for="item in spec_v2" :key="item.spec_id">
            <span class="params-name">{{item.spec_name}}</span>
            <ul :class="{'params-colors': item.spec_id == 1,'params-block': item.spec_id != 1}">
              <li 
                :class="{cur: curClass(option.id),disable: !getCombId(item.spec_id, option) }"
                v-for="option in item.spec_values" 
                :key="option.id"
                @click="getShopInfoMethod(option)"
              >
                <span v-if="item.spec_id == 1">
                  <img :src="option.image">
                </span>
                <span v-else>
                  {{option.show_name}}
                </span>
              </li>
            </ul>
          </div><!-- 
           <div class="sku-dynamic-params clear"  v-if="item.spec_id != 1" v-for="item in spec_v2" :key="item.spec_id">
            <span class="params-name">{{item.spec_name}}</span>
            <ul class="params-block">
              <li :class="{cur: curClass(option.id)}" v-for="option in item.spec_values" :key="option.id">
                  {{option.show_name}}
              </li>
            </ul>
          </div> -->

          <div class="sku-dynamic-params clear">
            <div class="params-name">数量</div>
            <div class="params-detail clear">
              <div class="item-num js-select-quantity">
                <span class="down" :class="{'down-disabled': downDisabled}" @click="minus">-</span>
                <span class="num">{{count}}</span>
                <span class="up" :class="{'up-disabled': upDisabled}" @click="add">+</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sku-status">
          <div class="cart-operation-wrapper clearfix">
            <span class="blue-title-btn js-add-cart" v-if="shopInfo.in_stock" @click="addCar">加入购物车</span>
            <span class="gray-title-btn" v-if="shopInfo.in_stock">现在购买</span>

            <span class="gray-title-btn item-disabled-btn" v-if="!shopInfo.in_stock">已售罄 </span>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="show" >
      <p class="confirm-msg">商品已达到最大可购买数量，无法继续添加</p>
    </Modal>
  </div>
</template>
<style src="./shopDetailsStyle.css"></style>
<script src="./shopDetailJs.js"></script>

