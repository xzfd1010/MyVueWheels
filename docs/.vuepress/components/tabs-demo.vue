<template>
  <div class="demo">
    <h2>基本用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-tabs :selected.sync="selectedTab">
          <n-tabs-head>
            <template slot="actions">
              <n-button>设置</n-button>
            </template>
            <n-tabs-item name="military">
              <icon name="settings"></icon>
              军事
            </n-tabs-item>
            <n-tabs-item name="finance" :disabled="true">
              <icon name="settings"></icon>
              财经
            </n-tabs-item>
            <n-tabs-item name="sports">
              <icon name="settings"></icon>
              体育
            </n-tabs-item>
          </n-tabs-head>
          <n-tabs-body>
            <n-tabs-pane name="military">军事新闻</n-tabs-pane>
            <n-tabs-pane name="finance">财经新闻</n-tabs-pane>
            <n-tabs-pane name="sports">体育新闻</n-tabs-pane>
          </n-tabs-body>
        </n-tabs>
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
import NTabs from '../../../src/tabs/tabs'
import NTabsHead from '../../../src/tabs/tabs-head'
import NTabsBody from '../../../src/tabs/tabs-body'
import NTabsItem from '../../../src/tabs/tabs-item'
import NTabsPane from '../../../src/tabs/tabs-pane'

import NButton from '../../../src/button/button'
import Icon from '../../../src/icon'

import mixin from '../mixin'

export default {
  name: 'tabs-demo',
  mixins: [mixin],
  components: { NTabs, NTabsHead, NTabsBody, NTabsItem, NTabsPane, NButton, Icon },
  data () {
    return {
      selectedTab: 'sports',
      codeStr: `
        <n-tabs :selected.sync="selectedTab">
            <n-tabs-head>
                <template slot="actions">
                    <n-button>设置</n-button>
                </template>
                <n-tabs-item name="military">
                    <icon name="settings"></icon>
                    军事
                </n-tabs-item>
                <n-tabs-item name="finance" :disabled="true">
                    <icon name="settings"></icon>
                    财经
                </n-tabs-item>
                <n-tabs-item name="sports">
                    <icon name="settings"></icon>
                    体育
                </n-tabs-item>
            </n-tabs-head>
            <n-tabs-body>
                <n-tabs-pane name="military">军事新闻</n-tabs-pane>
                <n-tabs-pane name="finance">财经新闻</n-tabs-pane>
                <n-tabs-pane name="sports">体育新闻</n-tabs-pane>
            </n-tabs-body>
        </n-tabs>
        `.replace(/^ {8}/gm, '').trim()
    }
  }
}
</script>

<style lang="scss">
</style>
