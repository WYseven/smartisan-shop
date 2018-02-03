// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import { sync } from 'vuex-router-sync'

const unsync = sync(store, router)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// 全局组件modal
import Modal from '@/components/modal/modal'
Vue.component('Modal', Modal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//unsync();