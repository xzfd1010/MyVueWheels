<template>
  <div class="demo">
    <h2>基础用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div class="component-wrapper">
        <n-input value="value"></n-input>
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
    
    <h2>特殊状态</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div class="component-wrapper">
        <n-input value="disabled" disabled></n-input>
        <n-input value="readonly" readonly></n-input>
        <n-input value="" error="errorInfo"></n-input>
      </div>
      <div>
        <p>
          <strong>代码</strong>
        </p>
        <div class="code-content" style="height: 0;">
          <div class="code-content-height">
            <pre><code class="html">{{codeStr2}}</code></pre>
          </div>
        </div>
        <div class="lock-code" @click="showCode(1)" ref="xxx">
          <icon class="icon-down" :name="isShow[1] === false ? 'down' : 'up'"></icon>
          <span class="lock-code-word">{{isShow[1] === false ? '显示代码' : '隐藏代码'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NInput from '../../../src/input'
import Icon from '../../../src/icon'

import mixin from '../mixin'

export default {
  name: 'input-demo',
  mixins: [mixin],
  components: { NInput, Icon },
  data () {
    return {
      value: '100',
      codeStr: `
<n-input></n-input>
        `.replace(/^ {8}/gm, '').trim(),
      codeStr2: `
<n-input value="disabled" disabled></n-input>
<n-input value="readonly" readonly></n-input>
<n-input value="" error="errorInfo"></n-input>
        `.replace(/^ {8}/gm, '').trim(),
    }
  }
}
</script>
