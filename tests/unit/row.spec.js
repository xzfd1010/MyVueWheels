import {expect} from 'chai'
import Vue from 'vue'
import Row from '../../src/grid/row'
import Col from '../../src/grid/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
  it('存在', () => {
    expect(Row).to.exist
  })

  // it('接收gutter属性', (done) => {
  //   Vue.component('my-row', Row)
  //   Vue.component('my-col', Col)
  //   const div = document.createElement('div')
  //   document.body.appendChild(div)
  //   div.innerHTML = `
  //     <my-row gutter="20">
  //        <my-col span="12">1</my-col>
  //        <my-col span="12">2</my-col>
  //     </my-row>
  //   `
  //   const vm = new Vue({
  //     el: div
  //   })
  //
  //   setTimeout(() => {
  //     const row = vm.$el.querySelector('.row')
  //     const cols = vm.$el.querySelectorAll('.col')
  //     expect(getComputedStyle(row).marginLeft).to.eq('-10px')
  //     expect(getComputedStyle(row).marginRight).to.eq('-10px')
  //     expect(getComputedStyle(cols[1]).paddingLeft).to.eq('10px')
  //     expect(getComputedStyle(cols[0]).paddingRight).to.eq('10px')
  //     done()
  //     vm.$el.remove()
  //     vm.$destroy()
  //   })
  // })
  //
  // it('接收align属性', () => {
  //   const Constructor = Vue.extend(Row)
  //   const div = document.createElement('div')
  //   document.body.appendChild(div)
  //   const vm = new Constructor({
  //     propsData: {
  //       align: 'center'
  //     }
  //   }).$mount(div)
  //
  //   const element = vm.$el
  //   expect(getComputedStyle(element).justifyContent).to.eq('center')
  //   div.remove()
  //   vm.$destroy()
  // })
})
