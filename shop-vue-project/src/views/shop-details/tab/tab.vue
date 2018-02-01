<template>
  <div class="gallery-wrapper">
    <div class="gallery">
      <div class="thumbnail">
        <ul>
          <li 
            :class="{on: currentIndex === index}" 
            v-for="item,index in imgs" :key="index"
            @mousemove="currentIndex = index"
          >
            <img v-lazy="item+'?x-oss-process=image/resize,w_100/format,webp'">
          </li>
        </ul>
      </div>
      <div class="thumb">
        <ul>
          <li class="on"><img v-lazy="imgs[currentIndex]+'?x-oss-process=image/resize,w_659/format,webp'"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        currentIndex: 0
      }
    },
    props: {
      imgs: {
        type: Array,
        default(){
          return [];
        }
      }
    }
  }
</script>
<style>
.gallery img {
  width: 100%;
  height: 100%;
}
</style>
