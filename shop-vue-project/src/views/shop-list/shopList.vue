<template>
  <div class="sku-box store-content">
    <div class="gray-box">
      <div class="item-box">
        <!--每一项-->
        <item @show="show=true" :key="item.id" v-for="item in list" :item="item"></item>
      </div>
    </div>
    <Modal v-model="show">
      <p class="confirm-msg">商品已达到最大可购买数量，无法继续添加</p>
    </Modal>
  </div>
</template>
<script src="./shopListJs.js"></script>
<style src="./shopListStyle.css"></style>

