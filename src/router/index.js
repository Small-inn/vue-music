import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/rank'
import Recommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import User from '@/components/user/user'

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/recommend'
}, {
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
}, {
  path: '/user',
  name: 'User',
  component: User
}]

export default new Router({
  routes
})
