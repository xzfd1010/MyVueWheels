import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Col from '../../src/grid/col'

chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {
  it('存在.', () => {
    expect(Col).to.exist
  })
  it('接收 span 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        span: 1
      }
    })
    const element = wrapper.element
    expect(element.classList.contains('col-1')).to.eq(true)
  })
  it('接收 offset 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        offset: 1
      }
    })
    const element = wrapper.element
    expect(element.classList.contains('offset-1')).to.eq(true)
  })
  it('接收 pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        pc: { span: 1, offset: 2 }
      }
    })
    const element = wrapper.element
    expect(element.classList.contains('col-pc-1')).to.eq(true)
    expect(element.classList.contains('offset-pc-2')).to.eq(true)
  })
  it('接收 ipad 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        ipad: { span: 1, offset: 2 }
      }
    })
    const element = wrapper.element
    expect(element.classList.contains('col-ipad-1')).to.eq(true)
    expect(element.classList.contains('offset-ipad-2')).to.eq(true)
  })
  it('接收 narrow-pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        narrowPc: { span: 1, offset: 2 }
      }
    })
    const element = wrapper.element
    expect(element.classList.contains('col-narrow-pc-1')).to.eq(true)
    expect(element.classList.contains('offset-narrow-pc-2')).to.eq(true)
  })
  it('接收 wide-pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        widePc: { span: 1, offset: 2 }
      }
    })
    const element = wrapper.element
    expect(element.classList.contains('col-wide-pc-1')).to.eq(true)
    expect(element.classList.contains('offset-wide-pc-2')).to.eq(true)
  })

})
