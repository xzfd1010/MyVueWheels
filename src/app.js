import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('my-button', Button)
Vue.component('icon', Icon)
Vue.component('my-button-group', ButtonGroup)

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
