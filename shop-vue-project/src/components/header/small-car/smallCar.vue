<template>
  <li v-show="$store.state.isCar" class="nav-cart" @mouseenter="enterHandle" @mouseleave="show=false">
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num cart-num">
      <i>{{totalCountAddPrice.count}}</i>
    </span>
    <div class="nav-cart-wrapper" :style="{display: show ? 'block' : 'none'}">
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
                      <router-link :to="{path:'/detail/'+item.id}">
                        <img :src="item.shop_info.ali_image">
                      </router-link>
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <router-link :to="{path:'/detail/'+item.id}">{{item.shop_info.title}}</router-link>
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
            <p>共 <strong class="ng-binding">{{totalCountAddPrice.count}}</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span>
            <span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">
              {{totalCountAddPrice.price}}
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
  import {mapState,mapGetters} from 'vuex'
  export default {    
    computed: {
      ...mapState({
        smallCarList: 'smallCarList'
      }),
      ...mapGetters(['totalCountAddPrice']),
      show: {
        get(){
          return this.$store.state.addCarShowSmallCar
        },
        set (value) {
           this.$store.commit('updatedShow', {
            show: value
          })
        }
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
      '$store.state.addCarShowSmallCar' () {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$store.commit('updatedShow', {
            show: false
          })
        }, 4000);
      }
    }
  }
</script>
