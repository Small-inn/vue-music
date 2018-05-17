import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import Mock from './data'

import 'common/stylus/index.styl'

// 使用模拟数据
Mock.init()
// 引入fastclick插件，消除300ms延时
fastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
