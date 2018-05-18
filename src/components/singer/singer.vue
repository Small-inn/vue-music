<template>
  <div class="singer">
    <ListView :data="singerList"></ListView>
  </div>
</template>

<script>
import ListView from 'base/listview/listview'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this._getSinger()
  },
  methods: {
    _getSinger () {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeData(res.data.list)
          console.log(this.singerList)
        }
      })
    },
    // 整理自己想要的数据
    _normalizeData (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 提取热门数据
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        // 获取a-z的数据，每个字母开头和下面的数据
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // 整理有序列表A-Z
      let ret = []
      let hot = []
      for (let k in map) {
        const val = map[k]
        // 正则
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="stylus">

</style>
