
export default {
  name: 'car',
  data(){
    return {
      show: false,
      removeItem : null  // 存放要删除的一项，方便在点击删除按钮时候找到id
    }
  },
  computed: {
    shopList(){
      return this.$store.state.smallCarList
    },
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
    toggle (item) {
      this.$store.commit('updatedSmallCarListChecked', {id:item.id})
    },
    toggleAll () {
      this.$store.commit('updatedSmallCarListAllChecked', { checked: !this.isCheckedAll })
    }
  },
  mounted(){
    this.$store.commit('updateLoading', { loading: false })
  }
}