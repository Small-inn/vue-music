<template>
  <div class="recommend">
    <!-- :data 是为了触发子组件的scroll里面的watch方法，以refresh，使得滑动生效，类似下面的v-if -->
    <Scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- 这个判断很重要，因为在slider组件的mounted的时候初始化方法了，但是这个请求的数据可能还没拿到，导致滑动失效 -->
        <!-- 1.0 推荐轮播 -->
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <!-- 整个slider都是图片撑起来的，所以判断图片是否load完成就OK了 -->
                <!-- class=""needsclick 解决滑动与fastclick的冲突 -->
                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <!-- 2.0 推荐歌单 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" class="item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy=item.imgUrl />
              </div>
              <div class="text">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 3.0 loading图片 -->
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slide'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    // 为了出现loading，延迟1秒
    setTimeout(() => {
      this._getDisList()
    }, 1000)
  },
  methods: {
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = !this.checkloaded
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider)
          this.recommends = res.data.slider
        }
      })
    },
    _getDisList () {
      getDiscList().then((res) => {
        console.log(res)
        this.discList = res.data.discList
      })
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
