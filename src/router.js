import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import UserProfile from './views/user/UserProfile'
import UsersList from './views/UsersList'

Vue.use(Router)

export default new Router({
    mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name: 'login',
      component: Login
    },
    {
      path:'/profile',
      name: 'profile',
      component: UserProfile
    },
    {
      path:'/users',
      name: 'users-list',
      component: UsersList
    },
  ]
     
  
})