export function textRange(el) {
  // el dom元素
  const textContent = el
  const targetW = textContent.getBoundingClientRect().width
  const range = document.createRange()
  range.setStart(textContent, 0)
  range.setEnd(textContent, textContent.childNodes.length)
  const rangeWidth = range.getBoundingClientRect().width
  return rangeWidth > targetW
}

export function moreTextRange(el) {
  // el dom元素
  const textContent = el
  const targetH = textContent.getBoundingClientRect().height
  const range = document.createRange()
  range.setStart(textContent, 0)
  range.setEnd(textContent, textContent.childNodes.length)
  const rangeH = range.getBoundingClientRect().height
  return rangeH > targetH
}
