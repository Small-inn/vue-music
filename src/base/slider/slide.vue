<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <!-- 插槽 -->
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{ active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  name: 'slider',
  props: {
    loop: { // 是否循环轮播
      type: Boolean,
      default: true
    },
    autoPlay: { // 是否自动播放
      type: Boolean,
      default: true
    },
    interval: { // 轮播时间间隔
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDos()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 切换多平台，自适应
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true) // 重新设置宽度
      this.slider.refresh() // 刷新轮播
    })
  },
  methods: {
    // 设置轮播宽度
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      console.log(this.children.length)
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px' // 设置单个slider-item宽度
        width += sliderWidth // 轮播总宽度（实例中是5，就是5倍大小）
      }
      // 这里处理了第一张和最后一张
      if (this.loop && !isResize) {
        // 如果是循环播放，在首尾个多一个，5 + 2大小
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDos () {
      this.dots = new Array(this.children.length)
      console.log(this.dots.length)
    },
    // 初始化，better-scroll 参数
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      // 小圆点与图片同步
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          clearInterval(this.timer)
          this._play()
        }
      })
      // 解决自动播放与手动滑动的冲突
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearInterval(this.timer)
        }
      })
    },
    // 自动轮播
    _play () {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setInterval(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
