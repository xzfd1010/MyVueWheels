let onClickDocument = (e) => {
  let { target } = e
  callbacks.forEach(item => {
    // 点击的位置在元素的外面，触发回调
    if (!item.el.contains(target)) {
      item.callback()
    }
  })
}
document.addEventListener('click', onClickDocument)
let callbacks = []
export default {
  bind (el, binding, value) {
    callbacks.push({ el, callback: binding.value })
  }
}

export const removeListener = () => {
  document.removeEventListener('click', onClickDocument)
}
