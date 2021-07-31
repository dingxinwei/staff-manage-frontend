import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/components/login')
    },
    {
      path: '/manage',
      component: () => import('@/components/manage'),
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      },
      children: [
        {
          path: '/home',
          component: () => import('@/components/home'),
          meta: ['首页']
        },
        {
          path: '/empList',
          component: () => import('@/components/empList'),
          meta: ['员工管理', '员工列表']
        },
        {
          path: '/addEmp',
          component: () => import('@/components/addEmp'),
          meta: ['员工管理', '添加员工']
        },
        {
          path: '/attence',
          component: () => import('@/components/attence'),
          meta: ['考勤管理', '考勤统计']
        },
        {
          path: '/dept',
          component: () => import('@/components/dept'),
          meta: ['部门管理', '部门列表']
        },
        {
          path: '/userList',
          component: () => import('@/components/userList'),
          meta: ['用户管理', '用户列表']
        },
        {
          path: '/explain',
          component: () => import('@/components/explain'),
          meta: ['说明', '系统说明']
        }
      ]
    }
  ]
})
