<template>
  	<div class="cart-group">
      <!--购物列表-->
      <div class="cart-top-items">
        <div class="cart-items">
          <div class="items-choose">
            <span class="blue-checkbox-new checkbox-on"><a></a></span>
          </div>
          <div class="items-thumb">
            <img :src="infoComputed.shop_info.ali_image">
            <a href="javascript:;" target="_blank"></a>
          </div>
          <div class="name hide-row" >
            <div class="name-table">
              <a href="javascript:;" target="_blank">{{infoComputed.name}}</a>
              <ul class="attribute">
                <li 
                  :key="value.spec_value_id" 
                  v-for="value in infoComputed.shop_info.spec_json"
                >{{value.show_name}}</li>
              </ul>
            </div>
          </div>
          <div class="operation">
            <a class="items-delete-btn"></a>
          </div>
          <div class="subtotal">¥ {{infoComputed.price * infoComputed.count}}</div>
          <div class="item-cols-num">
            <div class="select js-select-quantity">
              <span class="down down-disabled">-</span>
              <span class="num">{{infoComputed.count}}</span>
              <span class="up">+</span>
              
            </div>
          </div>
          <div class="price">¥ {{infoComputed.price}}</div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    props: ['info'],
    data: {
      isCheckedAll: true
    },
    computed: {
      infoComputed () {
        return this.info
      }
    }
  }
</script>