<template lang="html">
    <div id="main" v-if="shopItem.shop_info">
      <div class="store-content item">
				<div class="item-box">
					<div class="gallery-wrapper">
						<item-tab
							:imgs='shopItem.shop_info.ali_images' 
							:img="shopItem.shop_info.ali_image"
						></item-tab>
					</div>
          <div class="banner">
						<div class="sku-custom-title">
							<div class="params-price">
								<span><em>¥</em><i>{{shopItem.price}}</i></span>
							</div>
							<div class="params-info">
								<h4>{{shopItem.shop_info.title}}</h4>
								<h6>{{shopItem.shop_info.sub_title}}</h6>
							</div>
						</div>
						<div class="sku-dynamic-params-panel" v-if="shopItem.spec_v2">

							<div class="sku-dynamic-params clear" v-for="item,index in shopItem.spec_v2">
								<span class="params-name">{{item.spec_name}}</span>
								<ul 
									:class="{'params-colors':item.spec_id == 1,'params-normal': item.spec_id != 1}">
									<li 
										:class="{cur:isIncludeId(spec_values.id)}" 
										v-for='spec_values,index in item.spec_values'
										@click="spellData(item.spec_id,spec_values.id)"
									>
										<a>
											<span v-if='item.spec_id != 1'>{{spec_values.show_short_name}}</span>
											<img 
												v-if='item.spec_id == 1' 
												:src="'http://img01.smartisanos.cn/'+spec_values.image+'/20X20.jpg'"
											>
										</a>
									</li>
								</ul>
							</div>
							<div class="sku-dynamic-params clear">
								<div class="params-name">数量</div>
								<div class="params-detail clear">
									<div class="item-num js-select-quantity">
										<span class="down down-disabled">-</span>
										<span class="num">1</span>
										<span class="up up-disabled">+</span>
									</div>
								</div>
							</div>
						</div>
						<div class="sku-status">
							<div class="cart-operation-wrapper clearfix">
								<span class="blue-title-btn js-add-cart">加入购物车</span>
								<span class="gray-title-btn" @click="nowBuyShop">现在购买</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
import ItemTab from '@/views/shop-item/item-tab'
import {
  getShopItemId
} from '@/api/api_method'
export default {
	components: {
		ItemTab
	},
	computed: {
		shopItem () {
      return this.$store.state.shopItem || {}
		},
		specJson () {
			return this.shopItem.spec_json || []
		}
	},
  created () {
    let id = this.$route.query.id
    this.$store.dispatch('shopItemByIdAction', {id})
	},
	methods: {
		// 检测那些是被选中的
		isIncludeId(id){
			return !!this.specJson.find((item) => {
				return item.spec_value_id === id
			})
		},
		// 点击拼接选中的项，得到对应商品的id
		spellData(specId,specValuesId){
			let specItem = this.specJson.find((item) => {
						return item.spec_id === specId
					})
			if(specItem){
				specItem.spec_value_id = specValuesId
			}

			// 需要根据选中的specJson中的值，去找到对应id，更改地址栏的queryString

			// 找到一类商品的父级id   根据筛选出的条件去匹配这类商品的子级商品

			console.log(this.$route.params) // 一类的父级id

			console.log(this.specJson)

			getShopItemId(this.$route.params, this.specJson)

		},
		// 现在购买
		nowBuyShop () {
			this.$router.push({
				path: '/shop/checkout'
			})
		}
	}
}
</script>

<style lang="css">
.params-normal {
    float: left;
    line-height: 36px;
    margin: -10px 0 0 -10px;
    width: 402px;
}
.params-normal>li {
    float: left;
    margin: 10px 0 0 10px;
}
.params-normal>li.cur a {
    border: 1px solid #999;
    border: 0 solid rgba(226,226,226,1);
    box-shadow: inset 0 0 0 2px #B2B2B2;
}
.params-normal>li a {
    display: block;
    min-width: 16px;
    padding: 0 10px;
    text-align: center;
    color: #757575;
    border: 1px solid #dbdbdb;
    border: 0 solid rgba(226,226,226,1);
    border-radius: 3px;
    box-shadow: inset 0 0 0 1px #dbdbdb;
}
</style>
