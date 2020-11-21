import addEmp from '@/components/addEmp'
import empList from '@/components/empList'
import manage from '@/components/manage'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'manage',
      component: manage
    },
    {
      path: '/empList',
      name: 'empList',
      component: empList,
      meta: ['员工管理', '员工列表']
    },
    {
      path: '/addEmp',
      name: 'addEmp',
      component: addEmp,
      meta: ['员工管理', '添加员工']
    }
  ]
})
