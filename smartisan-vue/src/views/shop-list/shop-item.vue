<template lang="html">
  <div class="item">
    <div>
      <div class="item-img">
        <img
          :alt="sItem.sub_title"
          :src="sItem.ali_image+'?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'" style="opacity: 1;">
      </div>
      <h6>{{sItem.title}}</h6>
      <h3 >{{sItem.sub_title}}</h3>
      <div class="params-colors">
        <ul class="colors-list">
          <li v-for='smallIcon,i in shopItem.sku_list'>
            <a href="javascript:;" :class="{active: i === index}" @mouseenter='index = i'>
              <img :src="smallIcon.image">
            </a>
          </li>
        </ul>
      </div>
      <div class="item-btns clearfix" v-if='sItem.direct_to_cart'>
        <span class="item-gray-btn">
          <a :href="itemUrlStr" target="_blank">查看详情</a>
          <!-- <router-link :to="{path:'/shop/item/'+shopItem.id,query:{id:sItem.sku_id}}">查看详情</router-link> -->
        </span>
        <span class="item-blue-btn" @click="addCar">加入购物车 </span>
      </div>
      <div class="item-btns clearfix" v-if='!sItem.direct_to_cart'>
        <span class="item-gray-btn">
          <router-link :to="itemUrlLink">查看详情</router-link> 
        </span>
      </div>
      <div class="item-price clearfix">
        <i>¥</i><span>{{shopItem.price}}.00</span>
      </div>
      <div class="discount-icon">false</div>
      <div class="item-cover">
        <a href="javascript:;" target="_blank"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: 0
    }
  },
  props: {
    shopItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    sItem () {
      return this.shopItem.sku_list[this.index]
    },
    itemUrlStr () { // 适合字符串拼接形式
      return this.itemUrlLink.path + '?id=' + this.itemUrlLink.query.id
    },
    itemUrlLink () { // 适合router-link的形式
      return {
        path: '/shop/item/' + this.shopItem.id,
        query: {
          id: this.sItem.sku_id
        }
      }
    }
  },
  methods: {
    // 加入购物车
    addCar () {
      // 拿到要添加购物车商品的id
      let skuId = this.sItem.sku_id;

      this.$store.dispatch('cartByIdAddCountAction', {skuId})
    }
  }
}
</script>

<style lang="css">
</style>
