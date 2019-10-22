import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Content from './content'
import Sider from './sider'
import Footer from './footer'
import plugin from './plugin'

Vue.component('my-button', Button)
Vue.component('icon', Icon)
Vue.component('my-button-group', ButtonGroup)
Vue.component('my-input', Input)
Vue.component('my-row', Row)
Vue.component('my-col', Col)
Vue.component('my-layout', Layout)
Vue.component('my-header', Header)
Vue.component('my-footer', Footer)
Vue.component('my-content', Content)
Vue.component('my-sider', Sider)
Vue.use(plugin)

new Vue({
  el: '#app',
  data () {
    return {
      loading1: true,
      loading2: true,
      loading3: true
    }
  },
  methods: {
    showToast (position) {
      this.$toast({
        message: `${Math.floor(+Math.random() * 100)}确定关闭吗？`,
        autoClose: false,
        enableHtml: true,
        closeButton: {
          text: '是的',
          callback () {
            console.log('关闭')
          }
        },
        position: position
      })
    }
  },
  created () {

  }
})
