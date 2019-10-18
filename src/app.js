import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'

Vue.component('my-button', Button)
Vue.component('icon', Icon)
Vue.component('my-button-group', ButtonGroup)
Vue.component('my-input', Input)
Vue.component('my-row',Row)
Vue.component('my-col',Col)

new Vue({
  el: '#app',
  data () {
    return {
      loading1: true,
      loading2: true,
      loading3: true
    }
  }
})
