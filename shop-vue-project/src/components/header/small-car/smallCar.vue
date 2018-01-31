<template>
  <li v-show="$store.state.isCar" class="nav-cart" @mouseenter="enterHandle" @mouseleave="show=false">
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num cart-num">
      <i>{{$store.getters.totalCountAddPrice.count}}</i>
    </span>
    <div class="nav-cart-wrapper" v-show='show'>
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
                          <span v-for='option in item.shop_info.spec_json' :key="option.spec_id">
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
                    <div class="del-btn" @click="remove(item.id)">删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>共 <strong class="ng-binding">{{$store.getters.totalCountAddPrice.count}}</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span>
            <span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">
              {{$store.getters.totalCountAddPrice.price}}
            </span></h5>
            <h6>
            <!-- <router-link  class="nav-cart-btn" :to="{name:'car'}">去购物车</router-link> -->
            <a href="javascript:;" class="nav-cart-btn"  @click="goToCar">去购物车</a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
  export default {
    data(){
      return {
        show: false
      }
    },
    
    computed: {
      smallCarList(){
        return this.$store.state.smallCarList
      }
    },
    methods: {
      remove (id) {
        this.$store.commit('removeSmallCarListById', {id})
      },
      enterHandle(){
        this.show=true;
        clearTimeout(this.timer);
      },
      goToCar(){
        this.show = false;
        this.$router.push({name:'car'})
      }
    },
    watch: {
      smallCarList () {
        this.show = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.show = false;
        }, 4000);
      }
    }
  }
</script>
