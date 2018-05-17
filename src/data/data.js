import Mock from 'mockjs'

// 今日推荐
const discList = []
for (let i = 0; i < 20; i++) {
  discList.push(Mock.mock({
    commit_time: Mock.Random.date('yyyy-MM-dd'),
    create_time: Mock.Random.date('yyyy-MM-dd'),
    dissid: Mock.Random.string('number'),
    dissname: Mock.Random.cparagraph(1),
    imgUrl: Mock.Random.dataImage(),
    introdution: Mock.Random.cparagraph(3),
    name: Mock.Random.cname()
  }))
}

export { discList }
