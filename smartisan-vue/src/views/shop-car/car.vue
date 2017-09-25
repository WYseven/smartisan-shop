<template lang="html">
  <div class="cart-box">
		<div class="title">
			<h2>购物清单</h2>
		</div>
		<div class="cart-inner ui-cart">
			<div class="empty-label" :class="{hide:carShopList.length}">
				<h3>您的购物车中还没有商品</h3>
				<a class="link" href="javascript:;">现在选购</a>
			</div>
			<div v-show="carShopList.length">
				<div class="cart-table-title">
					<span class="name">商品信息</span>
					<span class="operation">操作</span>
					<span class="subtotal">小计</span>
					<span class="num">数量</span>
					<span class="price">单价</span>
				</div>
				<div class="cart-table">
					<div class="cart-group">
						<!--购物列表-->
						<div class="cart-top-items" v-for="item in carShopList">
							<div class="cart-items">
								<div class="items-choose">
									<span class="blue-checkbox-new checkbox-on"><a></a></span>
								</div>
								<div class="items-thumb">
									<img :src="item.ali_image">
									<a href="javascript:;" target="_blank"></a>
								</div>
								<div class="name hide-row" >
									<div class="name-table">
										<a href="javascript:;" target="_blank">{{item.title}}</a>
										<ul class="attribute">
											<li>透明</li>
										</ul>
									</div>
								</div>
								<div class="operation">
									<a class="items-delete-btn" href="javascript:;" @click="removeShop(item.sku_id)"></a>
								</div>
								<div class="subtotal">¥ {{item.totalPrice}}</div>
								<div class="item-cols-num">
									<div class="select js-select-quantity">
										<span class="down" :class='{"down-disabled": item.sku_num<=1}'>-</span>
										<span class="num">
											<input type="text" style="display: inline-block;" :value='item.sku_num'>
											<ul>
												<li>1</li>
												<li>2</li>
											</ul>
										</span>
										<span class="up" :class='{"up-disabled": item.sku_num>=5}'>+</span>
									</div>
								</div>
								<div class="price">¥ {{item.price}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div  v-show="carShopList.length" class="cart-bottom-bg fix-bottom">
			<div class="cart-bar-operation">
				<div>
					<div class="choose-all js-choose-all">
						<span class="blue-checkbox-new checkbox-on"><a></a></span>
						全选
					</div>
					<div class="delete-choose-goods">删除选中的商品</div>
				</div>
			</div>
			<div class="shipping">
				<div class="shipping-box">
					<div class="shipping-total shipping-num">
						<h4 class="">
							已选择 <i>0</i> 件商品
						</h4>
						<h5>
							共计 <i >{{$store.getters.carShopTotalInfo.totalNum}}</i> 件商品
						</h5>
					</div>
					<div class="shipping-total shipping-price">
						<h4 class="">
							应付总额：<span>￥</span><i >{{$store.getters.carShopTotalInfo.totalPric}}</i>
						</h4>
						<h5 class="shipping-tips">
							应付总额不含运费
						</h5>
					</div>
				</div>
				<span class="jianguo-blue-main-btn big-main-btn js-checkout disabled-btn"><a>现在结算</a></span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  computed: {
    carShopList () {
      return this.$store.state.shopCarList
    }
  },
  methods: {
    removeShop (id) {
      this.$store.dispatch('removeCarShopByIdAsync', {
        id
      })
    }
  }
}
</script>

<style lang="css" src='@/assets/css/cart.css'>
</style>
