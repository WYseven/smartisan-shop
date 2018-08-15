<template>
  <div class="item" @mouseover.once="getShopInfo">
    <!--图片显示-->
    <div class="item-img">
      <img :alt="currentList.title" v-lazy="currentList.ali_image">
    </div>
    <!--大标题和小标题-->
    <h6>{{currentList.title}}</h6>
    <h3>{{currentList.sub_title}}</h3>
     <!--每大类商品下，分多个小类型-->
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
        <a href="javascript:;" @click="seeDetail" target="_blank">查看详情</a>
      </span>
      <!--是否可以直接加入购物车，取决于direct_to_cart字段和是否有货inStock-->
      <span
        class="item-blue-btn" 
        @click="addCar"
        v-if="currentList.direct_to_cart && inStock"
      >加入购物车 </span>
       <!--inStock为false说明已售罄-->
      <span 
        class="item-disabled-btn" 
        v-if="!inStock"
      >已售罄 </span>
    </div>
    <div class="item-price clearfix">
      <i>¥</i>
      <span>199.00</span>
    </div>
  </div>
</template>
<script>
import { getShopInfoByIds } from '@/api/api_method'
  export default {
    name: 'item',
    data(){
      return {
        currentIndex: 0,  // 当前所在的小分类
        shopInfo: [],   // 鼠标移入后，拿到的所有商品的详细信息，包含是否有货的标识
        currentShopInfo: {}  // 根据currentIndex找到需要显示的商品
      }
    },
    props: {
      item:{ // 接收的商品详细数据
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      currentList(){ // 拿到下标对应的小类信息
        return this.skuList[this.currentIndex];
      },
      skuList () {  // 拿到大类商品下所有的小类
        return this.item.sku_list; //[{},{}]
      },
      ids () { // 拿到小类商品所有的id
        return this.skuList.map((item) => {
          return item.sku_id
        })
      },
      // 获取是否有货
      inStock(){

        //每次只能展示一个商品的数据 {sku_id:}

        // 详细信息 [{id:1,in_stock:true},{id:1,in_stock:false},{id:1,in_stock:true}]

        if(this.shopInfo.length){
          this.currentShopInfo = this.shopInfo.filter((item) => {
            return item.id == this.currentList.sku_id;
          })[0];
          return this.currentShopInfo.in_stock
        }
        return true;
      }
    },
    methods: {
      // 切换小分类商品
      tabList (index) {
        this.currentIndex = index;
      },
      // 跳转到查看详情
      seeDetail () {
        this.$router.push({
          path: '/detail/' + this.currentList.sku_id
        });
      },
      // 鼠标移入获取详细的信息
      getShopInfo () {
        getShopInfoByIds({ ids: this.ids.join()}).then((res) => {
          // 获取详情之后，可以根据详情的内容，来判断是否有货
          this.shopInfo = res.data.list;
        })
      },
      addCar () {
        /**
         * 在加入购物车之前需要先在stroe中获取smallCarList
         * 判断加入购物车这个商品的count是否已经到限制的最大数
         * 
         */
        
        let smallCarList = this.$store.state.smallCarList;
        let item = smallCarList.find(item => item.id === this.currentShopInfo.id)
        // 判断是否已经到最大购买数量
        if(item && item.count >= this.currentShopInfo.shop_info.limit_num){
          this.$emit('show',true);
          return;
        }
        // 给加入购物车的对象，添加上选中的标识，在购物车中使用
        if(!this.currentShopInfo.checked){
          this.currentShopInfo.checked = true;
        }

        // 添加到购物车

        // 更新数据，为小购物车服务
        this.$store.commit('updatedSmallCarList', {
          list: this.currentShopInfo
        })
        // 让小购物车显示出来
        this.$store.commit('updatedShow', {
          show: true
        })
      }
    }
  }
</script>
