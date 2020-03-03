import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Uploader from '@/uploader'
import http from '@/http'
import sinon from 'sinon'

chai.use(sinonChai)

Vue.config.productionTip = false // 阻止生产环境提示
Vue.config.devtools = false // 是否允许devtools检查代码

describe('Uploader', () => {
  it('存在.', () => {
    expect(Uploader).to.be.ok
  })
  it('可以上传一个文件', (done) => {
    let stub = sinon.stub(http, 'post').callsFake((url, options) => {
      setTimeout(() => {
        options.success('{"id": "123"}')
      }, 100)
    })
    const wrapper = mount(Uploader, {
      propsData: {
        name: 'file',
        action: '/upload',
        method: 'post',
        fileList: [],
        parseResponse: (response) => {
          let object = JSON.parse(response)
          return `/preview/${object.id}`
        }
      },
      slots: {
        default: `<button id="x">click me</button>`
      },
      listeners: {
        'update:fileList': (fileList) => { wrapper.setProps({ fileList }) },
        'uploaded': () => {
          Vue.nextTick().then(()=>{
            expect(wrapper.find('use').exists()).to.eq(false)
            expect(wrapper.props().fileList[0].url).to.eq('/preview/123')
            stub.restore()
            done()
          })
        }
      }
    })
    wrapper.find('#x').trigger('click')
    // 如何用js选中两个文件，就是修改input的files
    let inputWrapper = wrapper.find('input[type="file"]')
    let input = inputWrapper.element
    let file1 = new File(['xxx'], 'xxx.txt')
    // 可以作为面试最难的问题
    const data = new DataTransfer()
    data.items.add(file1)
    input.files = data.files

    const event = new Event('change', { bubbles: true })
    input.dispatchEvent(event)
    // mock服务器
    // '<use xlink:href="#icon-loading"></use>'
    Vue.nextTick().then(() => {
      let use = wrapper.find('use').element
      expect(use.getAttribute('xlink:href')).to.eq('#icon-loading')
    })
  })
  it('onchange', () => {
    let input = document.createElement('input')
    let callback = sinon.fake()
    input.addEventListener('change', callback)
    const event = new Event('change', { bubbles: true })
    input.dispatchEvent(event)
    expect(callback).to.be.called
  })

})
