<template>
  <div class="demo">
    <h2>基础用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-row>
          <n-col span="8">
            <div>8</div>
          </n-col>
          <n-col span="8">
            <div>8</div>
          </n-col>
          <n-col span="8">
            <div>8</div>
          </n-col>
        </n-row>
        
        <n-row>
          <n-col span="6">
            <div>6</div>
          </n-col>
          <n-col span="6">
            <div>6</div>
          </n-col>
          <n-col span="6">
            <div>6</div>
          </n-col>
          <n-col span="6">
            <div>6</div>
          </n-col>
        </n-row>
        
        <n-row>
          <n-col span="4">
            <div>4</div>
          </n-col>
          <n-col span="4">
            <div>4</div>
          </n-col>
          <n-col span="4">
            <div>4</div>
          </n-col>
          <n-col span="4">
            <div>4</div>
          </n-col>
          <n-col span="4">
            <div>4</div>
          </n-col>
          <n-col span="4">
            <div>4</div>
          </n-col>
        </n-row>
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
    
    <h2>设置gutter</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-row gutter="6">
          <n-col span="11">
            <div></div>
          </n-col>
          <n-col span="11">
            <div></div>
          </n-col>
        </n-row>
        
        <n-row gutter="6">
          <n-col span="5">
            <div></div>
          </n-col>
          <n-col span="5">
            <div></div>
          </n-col>
          <n-col span="5">
            <div></div>
          </n-col>
          <n-col span="5">
            <div></div>
          </n-col>
        </n-row>
      </div>
      <div>
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
    
    <h2>设置align</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-row align="left">
          <n-col span="8">
            <div></div>
          </n-col>
          <n-col span="8">
            <div></div>
          </n-col>
        </n-row>
        <n-row align="center">
          <n-col span="8">
            <div></div>
          </n-col>
          <n-col span="8">
            <div></div>
          </n-col>
        </n-row>
      </div>
      
      <n-row align="right">
        <n-col span="8">
          <div></div>
        </n-col>
        <n-col span="8">
          <div></div>
        </n-col>
      </n-row>
    </div>
    <div>
      <p>
        <strong>代码</strong>
      </p>
      <div class="code-content" style="height: 0;">
        <div class="code-content-height">
          <pre><code class="html">{{codeStr3}}</code></pre>
        </div>
      </div>
      <div class="lock-code" @click="showCode(2)" ref="xxx">
        <icon class="icon-down" :name="isShow[2] === false ? 'down' : 'up'"></icon>
        <span class="lock-code-word">{{isShow[2] === false ? '显示代码' : '隐藏代码'}}</span>
      </div>
    </div>
    <h2>设置offset</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <n-row>
          <n-col span="8" offset="8">
            <div>8</div>
          </n-col>
          <n-col span="8">
            <div>8</div>
          </n-col>
        </n-row>
        <n-row>
          <n-col span="6">
            <div>6</div>
          </n-col>
          <n-col span="6">
            <div>6</div>
          </n-col>
          <n-col span="6" offset="6">
            <div>6</div>
          </n-col>
        </n-row>
      </div>
    </div>
    <div>
      <p>
        <strong>代码</strong>
      </p>
      <div class="code-content" style="height: 0;">
        <div class="code-content-height">
          <pre><code class="html">{{codeStr4}}</code></pre>
        </div>
      </div>
      <div class="lock-code" @click="showCode(3)" ref="xxx">
        <icon class="icon-down" :name="isShow[3] === false ? 'down' : 'up'"></icon>
        <span class="lock-code-word">{{isShow[3] === false ? '显示代码' : '隐藏代码'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import NCol from '../../../src/grid/col'
import NRow from '../../../src/grid/row'
import Icon from '../../../src/icon'

import mixin from '../mixin'

export default {
  name: 'grid-demo',
  mixins: [mixin],
  components: { NCol, NRow, Icon },
  data () {
    return {
      codeStr: `
        <n-row>
            <n-col span="8">
                <div>8</div>
            </n-col>
            <n-col span="8">
                <div>8</div>
            </n-col>
            <n-col span="8">
                <div>8</div>
            </n-col>
        </n-row>
        
        <n-row>
            <n-col span="6">
                <div>6</div>
            </n-col>
            <n-col span="6">
                <div>6</div>
            </n-col>
            <n-col span="6">
                <div>6</div>
            </n-col>
            <n-col span="6">
                <div>6</div>
            </n-col>
        </n-row>
        
        <n-row>
            <n-col span="4">
                <div>4</div>
            </n-col>
            <n-col span="4">
                <div>4</div>
            </n-col>
            <n-col span="4">
                <div>4</div>
            </n-col>
            <n-col span="4">
                <div>4</div>
            </n-col>
            <n-col span="4">
                <div>4</div>
            </n-col>
            <n-col span="4">
                <div>4</div>
            </n-col>
        </n-row>
        `.replace(/^ {8}/gm, '').trim(),
      codeStr2: `
        <n-row gutter="6">
            <n-col span="11">
                <div></div>
            </n-col>
            <n-col span="11">
                <div></div>
            </n-col>
        </n-row>
        <n-row gutter="6">
            <n-col span="5">
                <div></div>
            </n-col>
            <n-col span="5">
                <div></div>
            </n-col>
            <n-col span="5">
                <div></div>
            </n-col>
            <n-col span="5">
                <div></div>
            </n-col>
        </n-row>
        `.replace(/^ {8}/gm, '').trim(),
      codeStr3: `
        <n-row align="left">
            <n-col span="8">
                <div></div>
            </n-col>
            <n-col span="8">
                <div></div>
            </n-col>
        </n-row>
        <n-row align="center">
            <n-col span="8">
                <div></div>
            </n-col>
            <n-col span="8">
                <div></div>
            </n-col>
        </n-row>
        </div>
        <n-row align="right">
            <n-col span="8">
                <div></div>
            </n-col>
            <n-col span="8">
                <div></div>
            </n-col>
        </n-row>`
        .replace(/^ {8}/gm, '').trim(),
      codeStr4: `
        <n-row>
            <n-col span="8" offset="8">
                <div>8</div>
            </n-col>
            <n-col span="8">
                <div>8</div>
            </n-col>
        </n-row>
        <n-row>
            <n-col span="6">
                <div>6</div>
            </n-col>
            <n-col span="6">
                <div>6</div>
            </n-col>
            <n-col span="6" offset="6">
                <div>6</div>
            </n-col>
        </n-row>
        `.replace(/^ {8}/gm, '').trim(),
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
