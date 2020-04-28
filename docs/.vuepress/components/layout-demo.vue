<template>
  <div class="demo">
    <h2>基本用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-layout>
          <n-sider class="sider">sider</n-sider>
          <n-layout>
            <n-header class="header">header</n-header>
            <n-content class="content" style="height: 300px;    background: #e9eef3;">content</n-content>
            <n-footer class="footer">footer</n-footer>
          </n-layout>
        </n-layout>
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
import NLayout from '../../../src/layout/layout'
import NHeader from '../../../src/layout/header'
import NFooter from '../../../src/layout/footer'
import NContent from '../../../src/layout/content'
import NSider from '../../../src/layout/sider'
import Icon from '../../../src/icon'

import mixin from '../mixin'

export default {
  name: 'layout-demo',
  mixins: [mixin],
  components: {
    NLayout,
    NHeader,
    NFooter,
    NContent,
    NSider,
    Icon
  },
  data () {
    return {
      codeStr: `
        <n-layout>
          <n-sider class="sider">sider</n-sider>
          <n-layout>
            <n-header class="header">header</n-header>
            <n-content class="content">content</n-content>
            <n-footer class="footer">footer</n-footer>
          </n-layout>
        </n-layout>
                `.replace(/^ {8}/gm, '').trim(),
    }
  }
}
</script>

<style lang="scss" scoped>
  .sider {
    background: #d3dce6;
  }
  .header {
    height: 100px;
    background: #b3c0d1;
  }
  .footer {
    height: 100px;
    background: #b3c0d1;
  }
  .content {
    height: 300px;
    background: #e9eef3;
  }
</style>
