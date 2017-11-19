<template lang="html">
  <div v-show='!isShowSmallCar'>
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num cart-num">
      <i>{{computedCountsAddPric.counts}}</i>
    </span>
    <div class="nav-cart-wrapper">
      <div class="nav-cart-list">
        <div class="empty" v-show="!smallCart.length">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full" v-show="smallCart.length">
          <div class="nav-cart-items">
            <ul>
              <li v-for="item,index in smallCart" class="clear">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img :src="item.shop_info.ali_image">
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="#/item/100027401">{{item.name}}</a>
                        </h4>
                        <p class="attrs">
                          <span v-for='value in item.shop_info.spec_json'>{{value.show_name}}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span>
                          <span class="price-num">{{item.price}}</span>
                          <span class="item-num">x {{item.count}}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click="removeShop(item.id)">删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>共 <strong class="ng-binding">{{computedCountsAddPric.counts}}</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span>
              <span class="price-num ng-binding" >{{computedCountsAddPric.prices}}</span>
            </h5>
            <h6>
              <!--<a  class="nav-cart-btn" href="http://www.smartisan.com/shop/#/cart"></a>-->
              <router-link class="nav-cart-btn" :to='{path: "/shop/cart"}'>去购物车</router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowSmallCar: true
    }
  },
  watch : {
    $route(){
      this.isShowSmallCar = this.$route.name === 'Cart'
    }
  },
  computed: {
    smallCart () {
      
      let smallCart = this.$store.getters.smallCartAddCounts;

      return smallCart
    },
    computedCountsAddPric () {
      return this.$store.getters.computedCountsAddPric;
    }
  },
  created () {
    this.$store.dispatch('getCarShopsLoding')
  },
  methods: {
    removeShop (skuId) {
      this.$store.dispatch('removeCarShopAction', {
        skuId
      })
    }
  }
}
</script>

<style lang="css">
</style>
