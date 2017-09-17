import Vue from 'vue'
import Router from 'vue-router'
import GameScreen from '../components/GameScreen'
import FullBoardView from '../components/FullBoardView.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/board',
      name: 'Game',
      component: GameScreen
    },
    {
      path: '/fullboard',
      name: 'FullBoard',
      component: FullBoardView
    }
  ]
})
