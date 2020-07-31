import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page1 from '@/components/page1'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page1',
      component: Page1
    }
  ]
})
