export const icons = require.context('../icons', false, /\.png$/)
export const pngIcons = icons.keys().map((i) => {
  return i.slice(2)
})
