let onClickDocument = (e) => {
  let { target } = e
  callbacks.forEach(item => {
    // item.el是绑定元素，绑定元素不包含当前电机的元素，说明点击的位置在元素的外面，触发回调
    if (!item.el.contains(target)) {
      item.callback()
    }
  })
}
document.addEventListener('click', onClickDocument)
let callbacks = []
export default {
  // el指令绑定的元素
  // binding：绑定的对象，binding.value是绑定的值
  bind (el, binding, vnode) {
    callbacks.push({ el, callback: binding.value })
  }
}

export const removeListener = () => {
  document.removeEventListener('click', onClickDocument)
}
