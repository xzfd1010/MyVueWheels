const expect = chai.expect
import Vue from 'vue'
import Toast from '@/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
  it('存在', () => {
    expect(Toast).to.exist
  })
  describe('props', () => {
    it('接受 message', () => {
      let message = '测试'
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          message
        }
      }).$mount()
      expect(vm.$el.innerText.includes(message)).to.eq(true)
    })
    it('接受 autoClose', (done) => {
      let div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          autoClose: 1
        }
      }).$mount(div)
      setTimeout(() => {
        expect(document.body.contains(vm.$el)).to.eq(false)
        done()
      }, 1500)
    })
    it('接受 closeButton', (done) => {
      const callback = sinon.fake()
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          closeButton: {
            text: '关闭吧',
            callback,
          }
        }
      }).$mount()
      let closeButton = vm.$el.querySelector('.close')
      expect(closeButton.innerText.trim()).to.eq('关闭吧')
      setTimeout(() => {
        closeButton.click()
        expect(callback).to.have.been.called
        done()
      }, 200)
    })
    it('接受 enableHtml和html形式的message', () => {
      let html = '<p id="content">html内容</p>'
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          message: html,
          enableHtml: true
        }
      }).$mount()
      // 需要选中p标签才证明是标签
      let p = vm.$el.querySelector('#content')
      expect(p).to.exist
    })
    it('接受 position', () => {
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          position: 'top'
        }
      }).$mount()
      // 检测class
      expect(vm.$el.classList.contains('position-top')).to.eq(true)
    })
  })
})
