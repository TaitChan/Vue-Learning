import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue') //基础布局
const Empty = () => import('@/layout/layout-empty.vue') //空布局

const routes: Array<RouteRecordRaw> = [
  {
    path: '/redirect', // 路由重定向
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login', //登录页
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: () => import('@/views/error-page/404.vue'),
  },
]

export const asyncRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'odometer', affix: true },
      },
    ],
  },
  {
    path: '/list',
    component: Layout,
    meta: { title: '列表页', icon: 'list' },
    children: [
      {
        path: '/list/table',
        component: () => import('@/views/list/table/index.vue'),
        meta: { title: '查询表格' },
      },
      {
        path: '/list/card',
        component: () => import('@/views/list/card/index.vue'),
        meta: { title: '卡片列表' },
      },
    ],
  },
  {
    path: '/error-page',
    component: Layout,
    meta: { title: '异常页', icon: 'warning' },
    children: [
      {
        path: '/error-page/403',
        component: () => import('@/views/error-page/403.vue'),
        meta: { title: '403' },
      },
      {
        path: '/error-page/404',
        component: () => import('@/views/error-page/404.vue'),
        meta: { title: '404' },
      },
      {
        path: '/error-page/500',
        component: () => import('@/views/error-page/500.vue'),
        meta: { title: '500' },
      },
    ],
  },
  {
    path: '/account',
    component: Layout,
    meta: { title: '个人中心', icon: 'user' },
    children: [
      {
        path: '/account/center',
        component: () => import('@/views/userInfo/index.vue'),
        meta: { title: '用户信息', icon: 'setting' },
      },
      {
        path: '/account/center',
        component: Empty,
        meta: { title: '用户信息', icon: 'setting', hidden: true },
        children: [
          {
            path: '/account/center/about',
            component: () => import('@/views/Magic.vue'),
            meta: { title: '用户信息详情', icon: 'setting' },
          },
        ],
      },
      {
        path: '/account/settings',
        component: () => import('@/views/Test.vue'),
        meta: { title: '用户设置', icon: 'setting' },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '测试', icon: 'rocket' },
    children: [
      {
        path: '/test',
        component: () => import('@/views/Test.vue'),
        meta: { title: '测试', icon: 'rocket' },
      },
      {
        path: '/test',
        component: Empty,
        meta: { title: '测试', icon: 'rocket', hidden: true },
        children: [
          {
            path: '/test/edit',
            component: () => import('@/views/Magic.vue'),
            meta: { title: '测试编辑', icon: 'rocket' },
          },
          {
            path: '/test/about',
            component: () => import('@/views/Magic.vue'),
            meta: { title: '测试详情', icon: 'rocket' },
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/magic',
        component: () => import('@/views/Magic.vue'),
        meta: { title: '魔法', icon: 'rocket', hidden: true },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/icons',
        component: () => import('@/views/icons/index.vue'),
        meta: { title: '图标', icon: 'sketch' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes, ...asyncRoutes],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { top: 0 }
  },
})

export default router
