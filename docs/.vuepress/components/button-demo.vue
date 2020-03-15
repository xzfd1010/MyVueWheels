<template>
  <div class="demo">
    <h2>基本用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div class="component-wrapper">
        <n-button>默认按钮</n-button>
        <n-button icon="settings">带 icon 按钮</n-button>
        <n-button :loading="true">加载按钮</n-button>
        <n-button disabled>禁用按钮</n-button>
      </div>
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
      </div>
    </div>
  </div>
</template>
<script>
import NButton from '../../../src/button/button'
import NButtonGroup from '../../../src/button/button-group'
import NIcon from '../../../src/icon'

import mixin from '../mixin'

export default {
  name: 'button-demo',
  mixins: [mixin],
  components: {
    NButton,
    NIcon,
    NButtonGroup
  },
  data () {
    return {
      codeStr: `
<n-button>默认按钮</n-button>
<n-button icon="settings">默认按钮</n-button>
<n-button :loading="true">默认按钮</n-button>
<n-button disabled>默认按钮</n-button>
        `.trim().split(/\n/).map(item => item.trim()).join('\n')
    }
  }
}
</script>

<style lang="scss">

</style>
