import Vue from 'vue'
import Tabs from '@/tabs/tabs'
import TabsHead from '@/tabs/tabs-head'
import TabsBody from '@/tabs/tabs-body'
import TabsItem from '@/tabs/tabs-item'
import TabsPane from '@/tabs/tabs-pane'

Vue.component('tabs', Tabs)
Vue.component('tabs-head', TabsHead)
Vue.component('tabs-body', TabsBody)
Vue.component('tabs-item', TabsItem)
Vue.component('tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.warnHandler = () => {}

import {expect} from 'chai'

// const div = document.createElement('div')
// document.body.appendChild(div)
// div.innerHTML = `
//         <tabs selected="finance">
//           <tabs-head>
//             <tabs-item name="woman">美女</tabs-item>
//             <tabs-item name="finance" disabled>财经</tabs-item>
//           </tabs-head>
//           <tabs-body>
//             <tabs-pane name="woman">美女相关资讯</tabs-pane>
//             <tabs-pane name="finance">财经相关资讯</tabs-pane>
//           </tabs-body>
//         </tabs>
//       `

describe('TabsItem', () => {
  it('存在', () => {
    expect(TabsItem).to.exist
  })
  // it('接受 name 属性', () => {
  //   const Constructor = Vue.extend(TabsItem)
  //   const vm = new Constructor({
  //     propsData: {
  //       name: 'xxx',
  //     }
  //   }).$mount()
  //   expect(vm.$el.getAttribute('data-name')).to.eq('xxx')
  // })
  // it('接受disabled属性', () => {
  //   const Constructor = Vue.extend(TabsItem)
  //   const vm = new Constructor({
  //     propsData: {
  //       disabled: true,
  //       name: 'test'
  //     }
  //   }).$mount()
  //   expect(vm.$el.classList.contains('disabled')).to.be.true
  //   const callback = sinon.fake()
  //   vm.$on('click', callback)
  //   vm.$el.click()
  //   expect(callback).to.have.not.been.called
  // })
})
