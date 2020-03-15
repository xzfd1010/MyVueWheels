import chai, { expect } from 'chai'
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Vue from 'vue'
import Toast from '../../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

chai.use(sinonChai)

describe('Toast', () => {
  it('存在', () => {
    expect(Toast).to.exist
  })
  describe('props', () => {
    it('接受 message', () => {
      let message = '测试'
      const wrapper = mount(Toast, {
        propsData: {
          message
        }
      })
      expect(wrapper.text().includes(message)).to.eq(true)
    })
    it('接受 autoClose', (done) => {
      const wrapper = mount(Toast, {
        attachToDocument: true,
        propsData: {
          autoClose: 1
        }
      })
      expect(document.body.contains(wrapper.element)).to.eq(true)
      setTimeout(() => {
        expect(document.body.contains(wrapper.element)).to.eq(false)
        done()
      }, 1500)
    })
    it('接受 closeButton', (done) => {
      const callback = sinon.fake()
      const wrapper = mount(Toast, {
        propsData: {
          closeButton: {
            text: '关闭吧',
            callback,
          }
        }
      })
      let closeButton = wrapper.element.querySelector('.close')
      expect(closeButton.innerText.trim()).to.eq('关闭吧')
      setTimeout(() => {
        closeButton.click()
        expect(callback).to.have.been.called
        done()
      }, 200)
    })
    it('接受 enableHTML和html形式的message', () => {
      let html = '<p id="content">html内容</p>'
      const wrapper = mount(Toast, {
        propsData: {
          message: html,
          enableHTML: true
        }
      })
      // 需要选中p标签才证明是标签
      let p = wrapper.element.querySelector('#content')
      expect(p).to.exist
    })
    it('接受 position', () => {
      const wrapper = mount(Toast, {
        propsData: {
          position: 'top'
        }
      })
      // 检测class
      expect(wrapper.classes('position-top')).to.eq(true)
    })
  })
})
