<template>
  <div class="demo">
    <h2>按钮组</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-button-group>
          <n-button icon="left">
            上一页
          </n-button>
          <n-button>
            更多
          </n-button>
          <n-button icon="right">
            下一页
          </n-button>
        </n-button-group>
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
          <n-icon class="icon-down" :name="isShow[1] === false ? 'down' : 'up'"></n-icon>
        </div>
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
  name: 'button-demo2',
  mixins: [mixin],
  components: {
    NButton,
    NIcon,
    NButtonGroup
  },
  data () {
    return {
      codeStr2: `
<n-button-group>
    <n-button icon="left">
    上一页
    </n-button>
    <n-button>
    更多
    </n-button>
    <n-button icon="right">
    下一页
    </n-button>
</n-button-group>
          `.replace(/^ {8}/gm, '').trim(),
    }
  }
}
</script>

<style lang="scss">

</style>
