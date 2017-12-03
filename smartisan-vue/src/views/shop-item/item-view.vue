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
						<div class="sku-dynamic-params-panel" v-if="shopItem.shop_info.spec_v2">

							<div class="sku-dynamic-params clear" v-for="item,index in shopItem.shop_info.spec_v2">
								<span class="params-name">{{item.spec_name}}</span>
								<ul 
									:class="{'params-colors':item.spec_id == 1,'params-normal': item.spec_id != 1}">
									<li 
										class="disable"
										:class="{cur:attrInfo[spec_values.spec_id] == spec_values.id}" 
										v-for='spec_values,index in item.spec_values'
										@click="spellData(item.spec_id,spec_values.id)"
									>
										<a>
											<span v-if='item.spec_id != 1'>{{spec_values.show_short_name}}</span>
											<img 
												v-if='item.spec_id == 1' 
												:src="spec_values.image"
											>
										</a>
									</li>
								</ul>
							</div>
							<div class="sku-dynamic-params clear">
								<div class="params-name">数量</div>
								<div class="params-detail clear">
									<quantity></quantity>
								</div>
							</div>
						</div>
						<div class="sku-status">
							<div class="cart-operation-wrapper clearfix">
								<span class="blue-title-btn js-add-cart" @click='addCar'>加入购物车</span>
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
import quantity from '@/components/quantity'
import {
  getShopItemId
} from '@/api/api_method'
export default {
	components: {
		ItemTab,
		quantity
	},
	computed: {
		shopItem () {
      return this.$store.state.shopItem || {}
		},
		specJson () {
			return this.shopItem.spec_json || []
		},
		skuId () {
			return this.shopItem.id
		},
		attrInfo () {
			let attr_info = this.shopItem.attr_info
			let checkedInfo = {}
			for(let attr in attr_info){
				/**
				 * key为类型id
				 * value为某一项的id
				*/
				checkedInfo[attr_info[attr].spec_id] = attr_info[attr].spec_value_id
			}
			checkedInfo.length = Object.keys(attr_info).length

			console.log(checkedInfo)
			
			return checkedInfo;
		}
	},
  created () {
    let id = this.$route.query.id
    this.$store.dispatch('shopItemByIdAction', {id})
	},
	watch: {
		'$route' : function () {
			let id = this.$route.query.id
    	this.$store.dispatch('shopItemByIdAction', {id})
		}
	},
	methods: {
		// 检测那些是被选中的,需要颜色的id和自己类型的id
		isIncludeId(spaecId,id){
			
			return this.shopItem.attr_info[spaecId].spec_value_id == id;
		},
		computedShopId(){

		},
		// 点击拼接选中的项，得到对应商品的id
		spellData(specId,specValuesId){
			this.shopItem.attr_info[specId].spec_value_id = specValuesId
			let sku_list = this.shopItem.sku_list;
			let needId = null;
			
			a:for(let i = 0; i < sku_list.length; i++){
				let count = 0;
				for(let j in this.attrInfo){
					if(sku_list[i].attr_info[j] && sku_list[i].attr_info[j].spec_value_id == this.attrInfo[j]){
						count++;
						if(count == this.attrInfo.length){
							needId = sku_list[i].id;  // 所需要的id
							break a;
						}
					}else{
						break;
					}
				}
			}
			
			if(needId){
				this.$router.push({
					path: '',
					query: {
						id: needId
					}
				})
			}
			

		},
		// 加入购物车
		addCar () {
			this.$store.dispatch('cartByIdAddCountAction', {skuId: this.skuId})
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
.params-normal>li.disable a {
	cursor: not-allowed;
  opacity: .6;
}
</style>
