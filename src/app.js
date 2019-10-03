import Vue from 'vue'
import GButton from './g-button'
import Icon from './icon'

Vue.component('my-button', GButton)
Vue.component('icon', Icon)

new Vue({
  el: '#app'
})
