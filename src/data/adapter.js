import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { discList } from './data'

export default {
  init () {
    let mock = new MockAdapter(axios)
    // 模拟请求成功的状态
    mock.onGet('/success').reply(200, {
      msg: 'success'
    })
    // 模拟请求失败的状态
    mock.onGet('/error').reply(500, {
      msg: 'error'
    })

    // 推荐歌单信息
    mock.onGet('getDiscList/info', { params: { plaform: 'yqq', hostUin: 0, sin: 0, ein: 29, sortId: 5 } }).reply(200, { discList })
  }
}
