import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import router from '@/router/index'
import { projTitle } from '@/utils/setting'

export const getCurrentPageTitle = (pageTitle) => {
  return pageTitle ? `${pageTitle} - ${projTitle}` : `${projTitle}`
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
  document.title = getCurrentPageTitle(to.meta.title)
})
router.afterEach((to) => {
  NProgress.done()
})
