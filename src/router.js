import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import UserProfile from './views/user/UserProfile'

Vue.use(Router)

export default new Router({
    mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name: 'Home',
      component: Home
    },
    {
      path:'/user',
      name: 'user profile',
      component: UserProfile
    },
  ]
     
  
})