<template>
  <div class="sku-box store-content">
    <div class="gray-box">
      <div class="item-box">
        <!--每一项-->
        <div class="item" :key="item" v-for="item in 20">
          <div class="item-img">
            <img alt="Smartisan 快充移动电源 10000mAh" src="http://image.smartisanos.cn/resource/ae40a16324658c192c7361d829f603bd.jpg?x-oss-process=image/resize,w_206/quality,Q_80/format,webp">
          </div>
          <h6>Smartisan 快充移动电源 10000mAh</h6>
          <h3>10000mAh 双向快充、轻盈便携、高标准安全保护</h3>
          <div class="params-colors">
            <ul class="colors-list">
              <li>
                <span class="active">
                  <img src="http://img01.smartisanos.cn/attr/v2/1000299/B37F37544921114CEF1EC01ED4DF44E4/20X20.jpg">
                </span>
              </li>
              <li>
                <span>
                  <img src="http://img01.smartisanos.cn/attr/v2/1000299/B37F37544921114CEF1EC01ED4DF44E4/20X20.jpg">
                </span>
              </li>
            </ul>
          </div>
          <div class="item-btns clearfix">
            <span class="item-gray-btn">
              <a href="javascript:;" target="_blank">查看详情</a>
            </span>
            <span class="item-blue-btn">加入购物车 </span>
            <span class="item-disabled-btn">已售罄 </span>
          </div>
          <div class="item-price clearfix">
            <i>¥</i>
            <span>199.00</span>
          </div>
          <div class="discount-icon">false</div>
          <div class="item-cover">
            <a href="javascript:;" target="_blank"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./shopListJs.js"></script>
<style src="./shopListStyle.css"></style>

