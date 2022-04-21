import { createApp } from 'vue'
import ElementPlus from 'element-plus' //基础组建库
import zhCn from 'element-plus/es/locale/lang/zh-cn' //中文
import './styles/index.scss' //公共样式;含element-plus自定义样式
import App from './App.vue'
import router from './router' //vue-router
import store from './store' //vuex:跨组件状态存储;localstorage:持久化状态，跨页面状态存储
import './icons/index.js' //批量导入svg图标
import './router/main' //路由跳转拦截
import components from '@/components/index.js'

const app = createApp(App)
app.use(components) //批量导入并注册全局公共组件
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(store)
app.use(router)
app.mount('#app')
