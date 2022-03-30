import { createStore, createLogger, MutationTree } from 'vuex'
const debug = process.env.NODE_ENV !== 'production'
const state = {
  //用户名称
  userName: 'Admin',
  //是否折叠左侧菜单栏，默认不折叠
  layoutAsideCollapse:
    localStorage.getItem('layoutAsideCollapse') !== null
      ? localStorage.getItem('layoutAsideCollapse') === 'true'
      : false,
  //是否显示顶部tags快捷导航，默认显示
  layoutTagsVisible:
    localStorage.getItem('layoutTagsVisible') !== null
      ? localStorage.getItem('layoutTagsVisible') === 'true'
      : true,
  //需要缓存的页面
  cachedViews: ['Dashboard'],
  //已访问页面（用于快捷导航）
  visitedViews: [],
}
//计算处理state
const getters = {
  lastVisitedView: (state) => {
    return state.visitedViews[state.visitedViews.length - 1]
  },
}
//改变state，同步
const mutations: MutationTree<any> = {
  //改变左侧菜单栏折叠状态
  setLayoutAsideCollapse: (state, val) => {
    state.layoutAsideCollapse = val
    localStorage.setItem('layoutAsideCollapse', val)
  },
  //改变顶部tags快捷导航显示状态
  setLayoutTagsVisible: (state, val) => {
    state.layoutTagsVisible = val
    localStorage.setItem('layoutTagsVisible', val)
  },
  //添加tags快捷导航已访问页面（不允许重复添加）
  addVisitedViews: (state, array) => {
    array.forEach((item) => {
      if (!state.visitedViews.includes(item)) {
        state.visitedViews.push(item)
      }
    })
  },
  //删除tags快捷导航中的某一已访问页面
  delVisitedViews: (state, array) => {
    array.forEach((item) => {
      state.visitedViews.splice(
        state.visitedViews.findIndex((v) => v.path === item.path),
        1
      )
    })
  },
}
//调用mutations，异步
const actions = {}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
