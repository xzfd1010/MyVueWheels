import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Button from '@/button/button'

chai.use(sinonChai)

Vue.config.productionTip = false // 阻止生产环境提示
Vue.config.devtools = false // 是否允许devtools检查代码

describe('Button', () => {
  it('存在.', () => {
    expect(Button).to.be.ok
  })
  it('可以设置icon.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      }
    })
    const useElement = wrapper.find('use')
    expect(useElement.attributes()['href']).to.equal('#icon-settings')
  })
  it('可以设置loading.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
        loading: true
      }
    })
    const vm = wrapper.vm
    const useElements = vm.$el.querySelectorAll('use')
    expect(useElements.length).to.equal(1)
    expect(useElements[0].getAttribute('xlink:href')).to.equal('#icon-loading')
  })
  it('icon 默认的 order 是 1', () => {
    const wrapper = mount(Button, {
      attachToDocument: true,
      propsData: {
        icon: 'settings',
      }
    })
    const icon = wrapper.element.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('1')
  })

  it('设置 iconPosition 可以改变 order', () => {
    const wrapper = mount(Button, {
      attachToDocument: true,
      propsData: {
        icon: 'settings',
        iconPosition: 'right'
      }
    })
    const icon = wrapper.find('svg').vm.$el
    expect(getComputedStyle(icon).order).to.eq('2')
  })
  it('点击 button 触发 click 事件', () => {
    const callback = sinon.fake() // callback知道自己有没有被调用过
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      },
      listeners: {
        'click': callback
      }
    })
    wrapper.trigger('click')
    expect(callback).to.have.been.called
  })
})
