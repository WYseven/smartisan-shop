<template>
  <div class="item" @mouseover.once="getShopInfo">
    <div class="item-img">
      <img :alt="currentList.title" v-lazy="currentList.ali_image">
    </div>
    <h6>{{currentList.title}}</h6>
    <h3>{{currentList.sub_title}}</h3>
    <div class="params-colors">
      <ul class="colors-list">
        <li 
          v-for="(item,index) in skuList" 
          :key="item.sku_id"
          @mouseover="tabList(index)"
        >
          <span :class="{active: currentIndex === index}">
            <img v-lazy="item.image" />
          </span>
        </li>
      </ul>
    </div>
    <div class="item-btns clearfix">
      <span class="item-gray-btn">
        <a href="javascript:;" target="_blank">查看详情</a>
      </span>
      <span 
        class="item-blue-btn" 
        @click="addCar"
        v-if="currentList.direct_to_cart && inStock"
      >加入购物车 </span>

      <span 
        class="item-disabled-btn" 
        v-if="!inStock"
      >已售罄 </span>
    </div>
    <div class="item-price clearfix">
      <i>¥</i>
      <span>199.00</span>
    </div>
    <div class="discount-icon">false</div>
    <div class="item-cover">
      <a href="javascript:;" target="_blank"></a>
    </div>
  </div>
</template>
<script>
import { getShopInfoByIds } from '@/api/api_method'
  export default {
    name: 'item',
    data(){
      return {
        currentIndex: 0,
        shopInfo: [],
        currentShopInfo: {}
      }
    },
    props: {
      item:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      currentList(){
        return this.skuList[this.currentIndex];
      },
      skuList () {
        return this.item.sku_list;
      },
      ids () {
        return this.skuList.map((item) => {
          return item.sku_id
        })
      },
      // 获取是否有货
      inStock(){
        if(this.shopInfo.length){
          this.currentShopInfo = this.shopInfo.filter((item) => {
            return item.id == this.currentList.sku_id;
          })[0]
          return this.currentShopInfo.in_stock
        }
        return true;
      }
    },
    methods: {
      tabList (index) {
        this.currentIndex = index;
      },
      getShopInfo () {
        getShopInfoByIds({ ids: this.ids.join()}).then((res) => {
          this.shopInfo = res.data.data.list;
        })
      },
      addCar () {
        let smallCarList = this.$store.state.smallCarList;
        let item = smallCarList.find(item => item.id === this.currentShopInfo.id)
        if(item && item.count >= this.currentShopInfo.shop_info.limit_num){
          return;
        }
        this.$store.commit('updatedSmallCarList', {
          list: this.currentShopInfo
        })
      }
    }
  }
</script>
