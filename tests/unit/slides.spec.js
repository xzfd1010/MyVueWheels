import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Slides from '@/slides/slides'
import SlidesItem from '@/slides/slides-item'

chai.use(sinonChai)

Vue.config.productionTip = false // 阻止生产环境提示
Vue.config.devtools = false // 是否允许devtools检查代码

describe('Slides', () => {
  it('存在.', () => {
    expect(Slides).to.be.ok
  })

  // 难点：slidesItem本身有slots，slides也有自己的slots
  it('接受slidesItem', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false
      },
      slots: {
        default: `
          <g-slides-item name="1">
            <div class="box1">1</div>
          </g-slides-item>
          <g-slides-item name="2">
            <div class="box2">2</div>
          </g-slides-item>
          <g-slides-item name="3">
            <div class="box3">3</div>
          </g-slides-item>`
      }
    })
    setTimeout(() => {
      expect(wrapper.find('.box1').exists()).to.be.true
      done()
    })
  })
  it('selected是几，选中的就是几', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '2'
      },
      slots: {
        default: `
          <g-slides-item name="1">
            <div class="box1">1</div>
          </g-slides-item>
          <g-slides-item name="2">
            <div class="box2">2</div>
          </g-slides-item>
          <g-slides-item name="3">
            <div class="box3">3</div>
          </g-slides-item>`
      }
    })
    setTimeout(() => {
      expect(wrapper.find('.box2').exists()).to.be.true
      done()
    })
  })

  it('点击第二个就展示第二个', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '1'
      },
      slots: {
        default: `
          <g-slides-item name="1">
            <div class="box1">1</div>
          </g-slides-item>
          <g-slides-item name="2">
            <div class="box2">2</div>
          </g-slides-item>
          <g-slides-item name="3">
            <div class="box3">3</div>
          </g-slides-item>`
      },
      listeners: {
        'update:selected': (x) => {
          expect(x).to.eq('2')
          done()
        }
      }
    })
    setTimeout(() => {
      wrapper.find('[data-index="1"]').trigger('click')
    })
  })

  // 自动播放
  it('会自动播放', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const callback = sinon.fake()
    const wrapper = mount(Slides, {
      propsData: {
        autoplay: true,
        selected: '1',
        autoplayDelay: 100,
      },
      slots: {
        default: `
          <g-slides-item name="1">
            <div class="box1">1</div>
          </g-slides-item>
          <g-slides-item name="2">
            <div class="box2">2</div>
          </g-slides-item>
          <g-slides-item name="3">
            <div class="box3">3</div>
          </g-slides-item>`
      },
      listeners: {
        'update:selected': callback
      }
    })
    setTimeout(() => {
      expect(callback).to.have.been.calledWith('2')
      done()
    }, 100)
  })

})
