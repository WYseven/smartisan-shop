<template lang="html">
  <div  @mouseenter='carShowHandle' @mouseleave='carShow=true'>
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num cart-num">
      <i>0</i>
    </span>
    <div class="nav-cart-wrapper" v-show='carShow'>
      <div class="nav-cart-list">
        <div class="empty" v-if="!shopCarList.length">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full"  v-if="shopCarList.length">
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for='carItem in shopCarList'>
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img :src="carItem.ali_image">
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="#/item/100027401">{{carItem.title}}</a>
                        </h4>
                        <p class="attrs">
                          <span v-for='spec in carItem.spec_json'>{{spec.show_name}}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span><span class="price-num">{{carItem.price}}</span><span class="item-num">x {{carItem.sku_num}}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click='removeCarShop(carItem.sku_id)'>删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>共 <strong class="ng-binding">{{carShopTotalInfo.totalNum}}</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span>
              <span class="price-num ng-binding">{{carShopTotalInfo.totalPric}}</span></h5>
            <h6>
              <a class="nav-cart-btn" href="http://www.smartisan.com/shop/#/cart">去购物车</a>
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
      carShow: true
    }
  },
  computed: {
    shopCarList () {
      return this.$store.state.shopCarList
    },
    carShopTotalInfo () {
      return this.$store.getters.carShopTotalInfo
    }
  },
  methods: {
    carShowHandle () {
      this.carShow = true
    },
    removeCarShop (id) {
      this.$store.dispatch('removeCarShopByIdAsync', {
        id
      })
    }
  },
  created () {
    this.$store.dispatch('getShopCarList')
  }
}
</script>

<style lang="css">
</style>
