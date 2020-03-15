<template>
  <div class="demo">
    <h2>click 触发</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-popover>
          <template v-slot:content="{close}">
            <div>popover1里面的内容</div>
            <n-button @click="close">关闭</n-button>
          </template>
          <template>
            <n-button>点我</n-button>
          </template>
        </n-popover>
        
        <n-popover position="bottom">
          <template slot="content">
            <div>popover2里面的内容</div>
          </template>
          <template>
            <n-button>点我</n-button>
          </template>
        </n-popover>
        
        <n-popover position="left">
          <template slot="content">
            <div>popover3里面的内容</div>
          </template>
          <template>
            <n-button>点我</n-button>
          </template>
        </n-popover>
        
        <n-popover position="right">
          <template slot="content">
            <div>popover4里面的内容</div>
          </template>
          <template>
            <n-button>点我</n-button>
          </template>
        </n-popover>
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
    <h2>hover 触发</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <div>
          <n-popover trigger="hover">
            <template v-slot:content="{close}">
              <div>popover1里面的内容</div>
              <n-button @click="close">关闭</n-button>
            </template>
            <template>
              <n-button>点我</n-button>
            </template>
          </n-popover>
          
          <n-popover trigger='hover' position="bottom">
            <template slot="content">
              <div>popover2里面的内容</div>
            </template>
            <template>
              <n-button>点我</n-button>
            </template>
          </n-popover>
          
          <n-popover trigger='hover' position="left">
            <template slot="content">
              <div>popover3里面的内容</div>
            </template>
            <template>
              <n-button>点我</n-button>
            </template>
          </n-popover>
          
          <n-popover trigger='hover' position="right">
            <template slot="content">
              <div>popover4里面的内容</div>
            </template>
            <template>
              <n-button>点我</n-button>
            </template>
          </n-popover>
        </div>
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
import NPopover from '../../../src/popover'
import NButton from '../../../src/button/button'
import Icon from '../../../src/icon'

import mixin from '../mixin'

export default {
  name: 'popover-demo',
  mixins: [mixin],
  components: { NPopover, NButton, Icon },
  data () {
    return {
      codeStr: `
        <n-popover>
          <template v-slot:content="{close}">
            <div>popover1里面的内容</div>
            <n-button @click="close">关闭</n-button>
          </template>
          <template>
            <n-button>点我</n-button>
          </template>
        </n-popover>
        
        <n-popover position="bottom">
          <template slot="content">
            <div>popover2里面的内容</div>
          </template>
          <template>
            <n-button>点我</n-button>
          </template>
        </n-popover>
        
        <n-popover position="left">
          <template slot="content">
            <div>popover3里面的内容</div>
          </template>
          <template>
            <n-button>点我</n-button>
          </template>
        </n-popover>
        
        <n-popover position="right">
          <template slot="content">
            <div>popover4里面的内容</div>
          </template>
          <template>
            <n-button>点我</n-button>
          </template>
        </n-popover>
        `.replace(/^ {8}/gm, '').trim(),
      codeStr2: `
        <n-popover trigger="hover">
            <template v-slot:content="{close}">
              <div>popover1里面的内容</div>
              <n-button @click="close">关闭</n-button>
            </template>
            <template>
              <n-button>点我</n-button>
            </template>
          </n-popover>
          
          <n-popover trigger='hover' position="bottom">
            <template slot="content">
              <div>popover2里面的内容</div>
            </template>
            <template>
              <n-button>点我</n-button>
            </template>
          </n-popover>
          
          <n-popover trigger='hover' position="left">
            <template slot="content">
              <div>popover3里面的内容</div>
            </template>
            <template>
              <n-button>点我</n-button>
            </template>
          </n-popover>
          
          <n-popover trigger='hover' position="right">
            <template slot="content">
              <div>popover4里面的内容</div>
            </template>
            <template>
              <n-button>点我</n-button>
            </template>
          </n-popover>
        `.replace(/^ {8}/gm, '').trim()
    }
  }
}
</script>

<style lang="scss">
  .text {font-size: 20px; border: 1px solid black;display: inline-block;padding: 5px;
    position: relative;
    max-width: 100px;
    word-break: break-all}
  .text::before, .text::after {
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
    left: 10px;
  }
  .text::before {
    border-top-color: black;
    top: 100%;
  }
  .text::after {
    border-top-color: white;
    top: calc(100% - 1px);
  }
</style>
