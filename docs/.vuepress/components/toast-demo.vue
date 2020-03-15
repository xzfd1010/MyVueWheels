<template>
  <div class="demo">
    <h2>基本用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-button @click="showToast('top')">from top</n-button>
        <n-button @click="showToast('middle')">from middle</n-button>
        <n-button @click="showToast('bottom')">from bottom</n-button>
      </div>
      <div>
        <p>
          <strong>代码</strong>
        </p>
        <div class="code-content" style="height: 0;">
          <div class="code-content-height">
            <pre><code class="html">{{codeStr}}</code></pre>
          </div>
        </div>
        <div class="lock-code" @click="showCode(0)" ref="xxx">
          <icon class="icon-down" :name="isShow[0] === false ? 'down' : 'up'"></icon>
          <span class="lock-code-word">{{isShow[0] === false ? '显示代码' : '隐藏代码'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NButton from '../../../src/button/button'
import Icon from '../../../src/icon'
import plugin from '../../../src/plugin'
import mixin from '../mixin'
import Vue from 'vue'

Vue.use(plugin)

export default {
  name: 'toast-demo',
  mixins: [mixin],
  components: { NButton, Icon },
  data () {
    return {
      codeStr: `
        <n-button @click="showToast('top')">from top</n-button>
        <n-button @click="showToast('middle')">from middle</n-button>
        <n-button @click="showToast('bottom')">from bottom</n-button>
        
        methods: {
            showToast (position) {
              this.$toast({
                // 用户选择开启“向slot中填入HTML"
                message: '这是一条<strong style="color: skyblue">toast</strong>信息',
                position,
                enableHTML: true,
                autoClose: 3,
                closeButton: {
                  text: '关闭',
                  // 这里的toast是plugin.js里的createToast函数内的toast
                  callback: (toast) => {
                    toast.log()
                  }
                },
              })
            }
          }
        `.replace(/^ {8}/gm, '').trim()
    }
  },
  methods: {
    showToast (position) {
      this.$toast({
        // 用户选择开启“向slot中填入HTML"
        message: '这是一条<strong style="color: skyblue">toast</strong>信息',
        position,
        enableHTML: true,
        autoClose: 3,
        closeButton: {
          text: '关闭',
          // 这里的toast是plugin.js里的createToast函数内的toast
          callback: (toast) => {
            toast.log()
          }
        },
      })
    }
  }
}
</script>

<style lang="scss">
</style>
