import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { mount, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Row from '../../src/grid/row'
import Col from '../../src/grid/col'

chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
  it('存在', () => {
    expect(Row).to.exist
  })

  it('接收gutter属性', (done) => {
    Vue.component('my-row', Row)
    Vue.component('my-col', Col)
    const wrapper = mount(Row, {
      propsData: {
        gutter: 20
      },
      slots: {
        default: `
          <my-col span="12">1</my-col>
          <my-col span="12">2</my-col>`
      }
    })

    Vue.nextTick(()=>{
      const row = wrapper.element
      const cols = wrapper.element.querySelectorAll('.col')
      expect(row.style.marginLeft).to.eq('-10px')
      expect(row.style.marginRight).to.eq('-10px')
      expect(cols[1].style.paddingLeft).to.eq('10px')
      expect(cols[0].style.paddingRight).to.eq('10px')
      done()
    })

  })

  it('接收align属性', () => {
    const wrapper = shallowMount(Row, {
      propsData: {
        align: 'center'
      }
    })
    const element = wrapper.element
    expect(wrapper.classes('align-center')).to.eq(true)
  })
})
