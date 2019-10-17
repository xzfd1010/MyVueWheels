const expect = chai.expect
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
  it('存在.', () => {
    expect(Input).to.exist
  })
  describe('props', () => {
    const Constructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })
    it('可以接受value.', () => {
      vm = new Constructor({
        propsData: {
          value: '张三'
        }
      }).$mount()
      const input = vm.$el.querySelector('input')
      expect(input.value).to.equal('张三')
    })
    it('可以接受disabled.', () => {
      vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount()
      const input = vm.$el.querySelector('input')
      expect(input.disabled).to.equal(true)
    })
    it('可以接受readonly.', () => {
      vm = new Constructor({
        propsData: {
          readonly: true
        }
      }).$mount()
      const input = vm.$el.querySelector('input')
      expect(input.readOnly).to.equal(true)
    })
    it('可以接受error.', () => {
      vm = new Constructor({
        propsData: {
          error: '你错了'
        }
      }).$mount()
      const errorElement = vm.$el.querySelector('.error-message')
      const useElement = vm.$el.querySelector('use')
      expect(useElement.getAttribute('xlink:href')).to.equal('#icon-error')
      expect(errorElement.innerText).to.equal('你错了')
    })
  })
  describe('测试事件', () => {
    const Constructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    });
    ['change', 'focus', 'input', 'blur'].forEach(eventName => {
      it('change/focus/input/blur事件测试', () => {
        vm = new Constructor().$mount()
        const inputElement = vm.$el.querySelector('input')
        const callback = sinon.fake()
        vm.$on(eventName, callback) // 组件绑定事件
        const event = new Event(eventName)
        inputElement.dispatchEvent(event)
        expect(callback).to.be.calledWith(event)
      })
    })
  })
})
