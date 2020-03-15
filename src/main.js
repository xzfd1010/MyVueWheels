import Vue from 'vue'
import Demo from './demo.vue'
import Toast from './plugin'

Vue.config.productionTip = false

Vue.use(Toast)

new Vue({
  render: h => h(Demo)
}).$mount('#app')
