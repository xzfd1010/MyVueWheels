import Vue from 'vue'
import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Tabs from '@/tabs/tabs'
import TabsHead from '@/tabs/tabs-head'
import TabsBody from '@/tabs/tabs-body'
import TabsItem from '@/tabs/tabs-item'
import TabsPane from '@/tabs/tabs-pane'

chai.use(sinonChai)

Vue.component('tabs', Tabs)
Vue.component('tabs-head', TabsHead)
Vue.component('tabs-body', TabsBody)
Vue.component('tabs-item', TabsItem)
Vue.component('tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.warnHandler = () => {}

describe('TabsItem', () => {
  it('存在', () => {
    expect(TabsItem).to.exist
  })
  it('接受 name 属性', () => {
    const tabsItem = mount(TabsItem, {
      propsData: {
        name: 'xxx',
      }
    })
    expect(tabsItem.element.getAttribute('data-name')).to.eq('xxx')
  })
  it('接受disabled属性', () => {
    const callback = sinon.fake()
    const tabsItem = mount(TabsItem, {
      propsData: {
        disabled: true,
        name: 'test',
      },
      listeners:{
        'click':callback
      }
    })

    expect(tabsItem.classes('disabled')).to.be.true

    tabsItem.trigger('click')
    expect(callback).to.have.not.been.called
  })
})
