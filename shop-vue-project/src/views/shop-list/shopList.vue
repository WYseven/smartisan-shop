<template>
  <div class="sku-box store-content">
    <div class="gray-box">
      <div class="item-box">
        <!--每一项-->
        <item :key="item.id" v-for="item in list" :item="item"></item>
      </div>
    </div>
  </div>
</template>
<script src="./shopListJs.js"></script>
<style src="./shopListStyle.css"></style>

