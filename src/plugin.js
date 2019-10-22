import Toast from './toast'

let currentToast
export default {
  install (Vue, options) {
    Vue.prototype.$toast = function (toastOptions = {}) {
      if (currentToast) {
        currentToast.close()
      }
      currentToast = createToast({
        Vue,
        toastOptions,
        onClose: () => {
          currentToast = null
        }
      })
    }
  }
}

function createToast ({ Vue, toastOptions, onClose }) {
  if (typeof toastOptions === 'string') {
    toastOptions = {
      message: toastOptions
    }
  }

  const Constructor = Vue.extend(Toast)
  const toast = new Constructor({
    propsData: toastOptions
  })

  // toast.$slots.default = [message]
  toast.$on('close', onClose)
  toast.$mount()

  document.body.appendChild(toast.$el)
  return toast
}
