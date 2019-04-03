import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'
import Profile from '@/components/user/Profile.vue'
import Signin from '@/components/user/Signin.vue'
import Signup from '@/components/user/Signup.vue'
import Picture from '@/components/pathology/Picture.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/picture/:pictureId',
      name: 'Picture',
      props: true,
      component: Picture
    },
    {
      path: '/about',
      name: 'about',
      component: About

      // component: () => import('./components/About.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
