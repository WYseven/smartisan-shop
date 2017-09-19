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
          <li v-for='smallIcon,i in smallIcons'>
            <a href="javascript:;" :class="{active: i === index}" @mouseenter='index = i'>
              <img :src="'http://img01.smartisanos.cn/'+smallIcon.image+'/20X20.jpg'">
            </a>
          </li>
        </ul>
      </div>
      <div class="item-btns clearfix" v-if='sItem.direct_to_cart'>
        <span class="item-gray-btn">
          <a href="javascript:;" target="_blank">查看详情</a>
        </span>
        <span class="item-blue-btn" @click="addShopCarHandle">加入购物车 </span>
      </div>
      <div class="item-btns clearfix" v-if='!sItem.direct_to_cart'>
        <span class="item-gray-btn"><a href="#/item/100023902" target="_blank">查看详情</a> </span>
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
      return this.shopItem.sku_info[this.index]
    },
    smallIcons () {
      return this.shopItem.sku_info.map((item) => {
        return {
          image: item.spec_json[0].image
        }
      })
    }
  },
  methods: {
    addShopCarHandle () {
      this.$store.dispatch('setShopCarAsync', this.sItem)
    }
  }
}
</script>

<style lang="css">
</style>
