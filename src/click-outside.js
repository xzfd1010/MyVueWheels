document.addEventListener('click', (e) => {
  callbacks.forEach(item => {
    // 点击的位置在元素的外面，触发回调
    if (!item.el.contains(e.target)) {
      item.callback()
    }
  })
})
let callbacks = []
export default {
  bind (el, binding, value) {
    callbacks.push({ el, callback: binding.value })
  }
}
