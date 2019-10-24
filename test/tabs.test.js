import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const expect = chai.expect
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsHead from '../src/tabs-head'
import TabsBody from '../src/tabs-body'
import TabsItem from '../src/tabs-item'
import TabsPane from '../src/tabs-pane'

Vue.component('tabs', Tabs)
Vue.component('tabs-head', TabsHead)
Vue.component('tabs-body', TabsBody)
Vue.component('tabs-item', TabsItem)
Vue.component('tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Tabs', () => {
  it('存在', () => {
    expect(Tabs).to.exist
  })
  it('只能接受 tabs-head 和 tabs-pane 作为组件', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
        <tabs selected="woman">
           <div>test</div>
        </tabs>
      `
    Vue.config.errorHandler = function (err) {
      let promise = Promise.reject(err)
      expect(promise).to.be.rejectedWith(Error)
    }
    new Vue({ el: div })
  })
  it('可以接受selected作为参数', (done) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
        <tabs selected="finance">
          <tabs-head>
            <tabs-item name="woman">美女</tabs-item>
            <tabs-item name="finance">财经</tabs-item>
          </tabs-head>
          <tabs-body>
            <tabs-pane name="woman">美女相关资讯</tabs-pane>
            <tabs-pane name="finance">财经相关资讯</tabs-pane>
          </tabs-body>
        </tabs>
      `
    let vm = new Vue({ el: div })
    setTimeout(() => {
      let el = vm.$el.querySelector('.tabs-item[data-name="finance"]')
      expect(el.classList.contains('active')).to.be.true
      done()
    })
  })
  it('可以接受direction prop', () => {

  })
})
