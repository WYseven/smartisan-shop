<template>
  	<div class="cart-group">
      <!--购物列表-->
      <div class="cart-top-items">
        <div class="cart-items">
          <div class="items-choose">
            <span 
              class="blue-checkbox-new" 
              @mousedown.prevent 
              @click="checkedHandle" 
              :class="{'checkbox-on': checked}"
            ></span>
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
            <a class="items-delete-btn" @click="removeShop"></a>
          </div>
          <div class="subtotal">¥ {{infoComputed.price * infoComputed.count}}</div>
          <div class="item-cols-num">
            <quantity
              :count="infoComputed.count" 
              :limit-num="infoComputed.shop_info.limit_num"
              :sku-id='infoComputed.id'
            ></quantity>
          </div>
          <div class="price">¥ {{infoComputed.price}}</div>
        </div>
      </div>
    </div>
</template>
<script>
  import Quantity from '@/components/quantity'

  export default {
    props: ['info'],
    data () {
      return {
        itemChecked: true
      }
    },
    components: {
      Quantity
    },
    computed: {
      infoComputed () {
        
        return this.info
      },
      checked : {
        get () {
          return this.infoComputed.checked
        },
        set (newValue) {
          this.infoComputed.checked = newValue
        }
      }
    },
    methods: {
      checkedHandle () {
        
        this.checked = !this.checked;
      },
      removeShop () {
        // 应该有个弹框提醒
        this.$store.dispatch('removeCarShopAction', {
          skuId: this.infoComputed.id
        })
      }
    }
  }
</script>