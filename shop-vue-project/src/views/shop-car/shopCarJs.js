
export default {
  name: 'car',
  data(){
    return {
      show: false,
      removeItem : null  // 存放要删除的一项，方便在点击删除按钮时候找到id
    }
  },
  computed: {
    // 从vue中拿到购物车的数据
    shopList(){
      return this.$store.state.smallCarList
    },

    // 选中商品的总价，只在购物车使用
    checkedCountAddPrice () {
      let obj = this.shopList.reduce((obj,item) => {
        if (item.checked){
          obj.price += item.price * item.count;
        }
        return obj;
      },{price:0})
      return obj.price;
    },
    // 是否都选中
    isCheckedAll: {
      get () {
        return this.shopList.every(item => item.checked)
      }
    },
    checkedLen(){
      return this.shopList.filter(item => item.checked).length
    }
  },
  methods:{
    disableDown(item) {
      return {
        'down-disabled': item.count <= 1
      }
    },
    disableUp(item){
      return {
        'up-disabled': item.count >= item.shop_info.limit_num
      }
    },
    minus(item) {  // 减商品
      if (item.count <= 1) return;
      this.$store.commit('updatedSmallCarList', { list: item, minus: true })
    },
    add(item) {  // 加商品
      if (item.count >= item.shop_info.limit_num ) return;
      this.$store.commit('updatedSmallCarList', { list: item, minus: false })
    },
    // 点击确定按钮，删除商品
    okRemove (){
      if (!this.removeItem) return;
      this.$store.commit('removeSmallCarListById', { id: this.removeItem.id })
      this.removeItem = null;
    },
    // 点击商品的删除按钮，弹出弹框
    remove(item) {
      this.show = true;
      this.removeItem = item;
    },
    // 单选
    toggle (item) {
      this.$store.commit('updatedSmallCarListChecked', {id:item.id})
    },
    // 多选
    toggleAll () {
      this.$store.commit('updatedSmallCarListAllChecked', { checked: !this.isCheckedAll })
    }
  },
  mounted(){
    // 渲染完成后loading，设置为false
    this.$store.commit('updateLoading', { loading: false })
  }
}