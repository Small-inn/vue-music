import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import Mock from './data'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'

// 使用模拟数据
Mock.init()
// 引入fastclick插件，消除300ms延时
fastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
