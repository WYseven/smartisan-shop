<template lang="html">
  <div>
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num cart-num">
      <i>0</i>
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
                    <div class="del-btn">删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>共 <strong class="ng-binding">123</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">49</span></h5>
            <h6>
              <a ng-href="http://www.smartisan.com/shop/#/cart" class="nav-cart-btn" href="http://www.smartisan.com/shop/#/cart">去购物车</a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    smallCart () {

      let smallCart = this.$store.state.smallCart;
      let cartCounts = this.$store.state.cartCounts;
      let arr = this.$store.state.arr;
      console.log(arr)
      smallCart.forEach((item) => {
        item.count = cartCounts[item.id].count
      })

      return smallCart
    }
  }
}
</script>

<style lang="css">
</style>
