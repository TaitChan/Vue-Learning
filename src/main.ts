import { createApp } from 'vue'
import ElementPlus from 'element-plus' //基础组建库
import zhCn from 'element-plus/es/locale/lang/zh-cn' //中文
import './styles/index.scss' //公共样式;含element-plus自定义样式
import App from './App.vue'
import router from './router' //vue-router
import store from './store' //vuex:跨组件状态存储;localstorage:持久化状态，跨页面状态存储
import SvgIcon from '@/components/SvgIcon/index.vue' //svg图标封装
import CtEllipsis from '@/components/CtEllipsis/index.vue'
import CtCard from '@/components/CtCard/index.vue'
import './icons/index.js' //批量导入svg图标
import './router/main' //路由跳转拦截

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(store)
app.use(router)
app.component('svg-icon', SvgIcon)
app.component('ct-ellipsis', CtEllipsis)
app.component('ct-card', CtCard)
app.mount('#app')
