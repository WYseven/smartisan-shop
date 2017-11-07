<template lang="html">
    <div id="main">
			<div class="sku-box store-content">
				<div class="sort-option">
					<ul class="line clear">
						<li><a href="javascript:;" class="active">综合排序</a></li>
						<li><a href="javascript:;">销量排序</a></li>
						<li><a href="javascript:;">价格低到高</a></li>
						<li><a href="javascript:;">价格高到低</a></li>
					</ul>
				</div>
				<div class="gray-box">
					<div class="item-box">
            <shop-item
              v-for="item,index in shopList"
              :key='index'
              :shop-item='item'
            ></shop-item>
					</div>
				</div>
			</div>
		</div>
</template>

<script>

import ShopItem from '@/views/shop-list/shop-item'

export default {
  components: {
    ShopItem
  },
  computed: {
    shopList () {
      return this.$store.state.shopList || []
    }
  },
  created () {
    this.$store.dispatch('getShopListDataAction')
  }
}
</script>

<style lang="css">
</style>
