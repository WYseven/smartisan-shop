<template lang="html">
  <div>
    <header-nav></header-nav>
    <div id="main">
      <div class="sku-box store-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/components/header-nav'

export default {
  components: {
    HeaderNav
  }
}
</script>

<style lang="css">
</style>
