export default {
  name: 'car',
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
    remove(item) {
      this.$store.commit('removeSmallCarListById', { id:item.id })
    },
    toggle (item) {
      this.$store.commit('updatedSmallCarListChecked', {id:item.id})
    },
    toggleAll () {
      this.$store.commit('updatedSmallCarListAllChecked', { checked: !this.isCheckedAll })
    }
  },
  mounted(){

  }
}