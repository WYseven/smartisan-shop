<template>
  <div id="main" class="hander-car">
			<div class="store-content">
				<div class="cart-box">
					<div class="title">
						<h2>购物清单</h2>
					</div>
					<div class="cart-inner">
						<div class="empty-label" :class="{hide: hasShops}">
							<h3>您的购物车中还没有商品</h3>
							<router-link class="link" to="/shop/list">现在选购</router-link>
						</div>
						<div v-show="hasShops">
							<div class="cart-table-title">
								<span class="name">商品信息</span>
								<span class="operation">操作</span>
								<span class="subtotal">小计</span>
								<span class="num">数量</span>
								<span class="price">单价</span>
							</div>
							<div class="cart-table">
                <cart-item 
									:key="item.id" 
									v-for="item in smallCartAddCounts" 
									:info='item'></cart-item>
							</div>
						</div>
					</div>
					<div v-show="hasShops" class="cart-bottom-bg fix-bottom">
						<div class="cart-bar-operation">
							<div>
								<div class="choose-all js-choose-all">
									<span 
										class="blue-checkbox-new" 
										@mousedown.prevent 
										@click.prevent="toggleCheckedAll" 
										:class="{'checkbox-on':isCheckedAll}">
									</span>
									全选
								</div>
								<div class="delete-choose-goods">删除选中的商品</div>
							</div>
						</div>
						<div class="shipping">
							<div class="shipping-box">
								<div class="shipping-total shipping-num">
									<h4 class="">
										已选择 <i>{{checkedShopsLen}}</i> 件商品
									</h4>
									<h5>
										共计 <i >{{computedCountsAddPric.counts}}</i> 件商品
									</h5>
								</div>
								<div class="shipping-total shipping-price">
									<h4 class="">
										应付总额：<span>￥</span><i >{{payable}}</i> 
									</h4>
									<h5 class="shipping-tips">
										应付总额不含运费
									</h5>								
								</div>
							</div>
							<span 
								class="jianguo-blue-main-btn big-main-btn js-checkout" 
								:class="{'disabled-btn':checkedShopsLen === 0}"
								@click="settlementHandle"
							><a>现在结算</a></span>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
  import CartItem from '@/views/shop-cart/cart-item'
  export default {
    components: {
      CartItem
		},
		data () {
			return {
				checkedAll: true
			}
		},
		computed: {
			smallCartAddCounts(){
				let shops = this.$store.getters.smallCartAddCounts
				
				return shops
			},
			hasShops () {
				return !!this.smallCartAddCounts.length
			},
			checkedShops () { // 已选择几件商品？
				return this.smallCartAddCounts.filter(item => item.checked)
			},
			checkedShopsLen () {
				return this.checkedShops.length
			},
			isCheckedAll: {
				get () {
					return this.smallCartAddCounts.findIndex(item => !item.checked) === -1
				},
				set (newValue) {
					this.smallCartAddCounts.forEach(item => {
						item.checked = newValue;
					});
				}
			},
			payable () {  // 应付金额
				return this.checkedShops.reduce((n,item) => {
					return n + item.count * item.price
				},0)
			},
			computedCountsAddPric () {
				return this.$store.getters.computedCountsAddPric
			}
		},
		methods: {
			toggleCheckedAll () {
				this.isCheckedAll = !this.isCheckedAll
			},
			settlementHandle () {
				if(this.checkedShopsLen){
					this.$router.push({
						path: '/shop/checkout'
					})
				}
			}
		}
  }
</script>