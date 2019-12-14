import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Input from '@/input'

Vue.config.productionTip = false
Vue.config.devtools = false

chai.use(sinonChai)

describe('Input', () => {
  it('存在.', () => {
    expect(Input).to.exist
  })
  describe('props', () => {
    it('可以接受value.', () => {
      const wrapper = mount(Input, {
        propsData: {
          value: '张三'
        }
      })
      const input = wrapper.element.querySelector('input')
      expect(input.value).to.equal('张三')
    })
    it('可以接受disabled.', () => {
      const wrapper = mount(Input, {
        propsData: {
          disabled: true
        }
      })
      const input = wrapper.element.querySelector('input')
      expect(input.disabled).to.equal(true)
    })
    it('可以接受readonly.', () => {
      const wrapper = mount(Input, {
        propsData: {
          readonly: true
        }
      })
      const input = wrapper.element.querySelector('input')
      expect(input.readOnly).to.equal(true)
    })
    it('可以接受error.', () => {
      const wrapper = mount(Input, {
        propsData: {
          error: '你错了'
        }
      })
      const errorElement = wrapper.element.querySelector('.error-message')
      const useElement = wrapper.element.querySelector('use')
      expect(useElement.getAttribute('xlink:href')).to.equal('#icon-error')
      expect(errorElement.innerText).to.equal('你错了')
    })
  })
  describe('测试事件', () => {
    ['change', 'focus', 'input', 'blur'].forEach(eventName => {
      it('change/focus/input/blur事件测试', () => {
        const callback = sinon.fake()
        const wrapper = mount(Input, {
          listeners: {
            [eventName]: callback
          }
        })
        const inputElement = wrapper.element.querySelector('input')
        const event = new Event(eventName)
        Object.defineProperty(
          event, 'target', {
            value: { value: 'hi' }, enumerable: true
          }
        )
        inputElement.dispatchEvent(event)
        expect(callback).to.be.calledWith('hi')
      })
    })
  })
})
