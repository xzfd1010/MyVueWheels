const expect = chai.expect
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {

  it('存在.', () => {
    expect(Popover).to.exist
  })

  it('可以设置position.', (done) => {
    Vue.component('popover', Popover)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <popover position="bottom" ref="a">
      <template slot="content">
      弹出内容
      </template>
      <button>点我</button>
    </popover>
    `
    const vm = new Vue({
      el: div
    })
    vm.$el.querySelector('button').click()
    vm.$nextTick(() => {
      const { contentWrapper } = vm.$refs.a.$refs
      expect(contentWrapper.classList.contains('position-bottom')).to.be.true
      done()
    })
  })

  it('可以设置 trigger', (done) => {
    Vue.component('popover', Popover)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <popover trigger="hover" ref="a">
      <template slot="content">
      弹出内容
      </template>
      <button>点我</button>
    </popover>
    `
    const vm = new Vue({
      el: div
    })
    vm.$nextTick(() => {
      let event = new Event('mouseenter')
      const { triggerWrapper, contentWrapper } = vm.$refs.a.$refs
      triggerWrapper.dispatchEvent(event)
      setTimeout(() => {
        expect(contentWrapper.style.display).to.not.eq('none')
        done()
      }, 200)
    })

  })

})
