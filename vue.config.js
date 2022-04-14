// vue.config.js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Vue-Learning/' : '/',
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // 如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置：
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // css: {
  //   // 如果想在 JavaScript 中作为 CSS Modules 导入 CSS 或其它预处理文件，该文件应该以 .module.(css|less|sass|scss|styl) 结尾：
  //   // 如果你想去掉文件名中的 .module
  //   requireModuleExtension: false,
  //   loaderOptions: {
  //     // 给 sass-loader 传递选项
  //     scss: {
  //       prependData: `
  //       @use "@/styles/variables.scss" as *;
  //       @use "@/styles/mixins.scss" as *;
  //       @use "@/styles/element.scss" as *;
  //       `,
  //     },
  //   },
  // },
  // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
  devServer: {
    // proxy: 'http://localhost:4000',
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            './src/styles/variables.scss',
            './src/styles/mixins.scss',
          ],
        })
        .end()
    })
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
}
