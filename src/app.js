import Vue from 'vue'
import GButton from './g-button'
import Icon from './icon'

Vue.component('my-button', GButton)
Vue.component('icon', Icon)

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
