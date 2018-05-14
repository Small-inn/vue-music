import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/rank'
import Recommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'

Vue.use(Router)

const routes = [{
  path: '/recommend',
  name: 'Recommend',
  component: Recommend
}, {
  path: '/rank',
  name: 'Rank',
  component: Rank
}, {
  path: '/search',
  name: 'Search',
  component: Search
}, {
  path: '/singer',
  name: 'Singer',
  component: Singer
}]

export default new Router({
  routes
})
