<template lang="html">
  	<div class="gallery">
      <div class="thumbnail">
        <ul>
          <li 
            :class="{on:index === i}" 
            v-for="item,i in imgs"
            @mouseenter="index = i"
          >
            <img :src="item+'?x-oss-process=image/resize,w_108/quality,Q_90/format,webp'">
          </li>
        </ul>
      </div>
      <div class="thumb">
        <ul>
          <li class="on">
            <img name="slide-fade" :src="showImg">
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      index: 0
    }
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    showImg () {
      return this.imgs[this.index]
    }
  }
}
</script>

<style lang="css">
  .thumbnail li {
    width: 54px;
    height: 54px;
    border-radius: 5px;
    cursor: pointer;
  }
  .gallery img {
    width: 100%;
  }
  .thumb ul li{
    width: 440px;
    height: 440px;
  }
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
