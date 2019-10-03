import Vue from 'vue'
import GButton from './g-button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('my-button', GButton)
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
