import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Nav from '@/nav/nav'
import NavItem from '@/nav/nav-item'

chai.use(sinonChai)

Vue.config.productionTip = false // 阻止生产环境提示
Vue.config.devtools = false // 是否允许devtools检查代码
Vue.component('myNavItem', NavItem)

describe('Nav', () => {
  it('存在.', () => {
    expect(Nav).to.be.ok
  })
  it('支持selected属性', (done) => {
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      slots: {
        default: `
          <my-nav-item name="home">首页</my-nav-item>
          <my-nav-item name="about">关于</my-nav-item>
          <my-nav-item name="hire">招聘</my-nav-item>`
      }
    })
    Vue.nextTick(() => {
      expect(wrapper.find(NavItem).classes()).to.contain('selected')
      done()
    })
  })
  it('会触发 update:selected 事件', () => {
    const callback = sinon.fake()
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      slots: {
        default: `
          <my-nav-item name="home">首页</my-nav-item>
          <my-nav-item name="about">关于</my-nav-item>
          <my-nav-item name="hire">招聘</my-nav-item>`
      },
      listeners: {
        'update:selected': callback
      }
    })

    // Vue.nextTick(() => {
    wrapper.find('[data-name="hire"]').trigger('click')
    expect(callback).to.have.been.calledWith('hire')
    // done()
    // })
  })
})
