import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
Vue.use(VueRouter)

let routes = [
  {
    path: '/login',
    component: resolve => require(['@/components/Login'], resolve),
    name: 'login',
    hidden: true
  },
  {
    path: '/404',
    component: resolve => require(['@/components/404'], resolve),
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-tickets',
    leaf: true, // 只有一个节点
    children: [
      {
        path: '/usermanagement',
        component: resolve => require(['@/components/userManagement/UserManagement'], resolve),
        name: '用户管理'
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-tickets',
    leaf: true, // 只有一个节点
    children: [
      {
        path: '/orders',
        component: resolve => require(['@/components/orders/Orders'], resolve),
        name: '订单查看'
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-tickets',
    leaf: true, // 只有一个节点
    children: [
      {
        path: '/ok',
        component: resolve => require(['@/components/OK'], resolve),
        name: '站点管理'
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '00',
    iconCls: 'el-icon-tickets',
    children: [
      {
        path: '/table',
        component: Home,
        name: 'Table'
      },
      {
        path: '/form',
        component: Home,
        name: 'Form'
      },
      {
        path: '/user',
        component: Home,
        name: '列表'
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]
export default new VueRouter({
  mode: 'history',
  routes: routes
})
