/**
 *推荐相关
 */
import jsonp from 'common/js/jsonp'
import axios from 'axios'

import {
  commonParams,
  options
} from './config'
// 轮播图请求接口
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    nin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

// 热门歌单推荐请求
export function getDiscList () {
  const data = Object.assign({}, {
    params: {
      plaform: 'yqq',
      hostUin: 0,
      sin: 0,
      ein: 29,
      sortId: 5
    }
  })
  return axios.get('getDiscList/info', data)
}
