<template>
  <div class="select js-select-quantity">
    <span class="down" :class = "{'down-disabled': isMinus}" @click='minusCount'>-</span>
    <span class="num">{{count}}</span>
    <span class="up" :class = "{'down-disabled': isAdd}" @click="addCount">+</span>
    
  </div>
</template>
<script>
export default {
  props: {
    count: {
      default: 1
    },
    limitNum: {
      default: 5
    },
    skuId: {}
  },
  computed: {
    isMinus () {
      return this.count == 1  // 如果是1件商品就没必要减少了
    },
    isAdd () {
      return parseInt(this.count) >= parseInt(this.limitNum)
    }
  },
  methods: {
    addCount () {
      if(!this.isAdd){
        this.$store.dispatch('cartByIdAddCountAction', {skuId: this.skuId})
      }
      
    },
    minusCount () {
      if(!this.isMinus){
        this.$store.dispatch('cartByIdAddCountAction', {skuId: this.skuId,minus:true})
      }
      
    }
  }
}
</script>
