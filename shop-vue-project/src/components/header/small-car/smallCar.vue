<template>
  <li class="nav-cart">
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num cart-num">
      <i>0</i>
    </span>
    <div class="nav-cart-wrapper">
      <div class="nav-cart-list">
        <!--购物车为空提示-->
        <div class="empty" v-show='!smallCarList.length'>
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <!--小购物车-->
        <div class="full" v-show='smallCarList.length'>
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for="item in smallCarList" :key="item.id">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img :src="item.shop_info.ali_image">
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="#/item/100027401">{{item.shop_info.title}}</a>
                        </h4>
                        <p class="attrs">
                          <span v-for='option in item.spec_json' :key="option.spec_id">
                            {{option.show_name}}
                          </span>
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
            <p>共 <strong class="ng-binding">1</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">49</span></h5>
            <h6>
              <a class="nav-cart-btn">去购物车</a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
  export default {
    computed: {
      smallCarList(){
        return this.$store.state.smallCarList
      }
    }
  }
</script>
