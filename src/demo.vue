<template>
  <div class="demo">
    <h2>基础用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <div>
      <div>
        <g-row>
          <g-col span="8">
            <div>8</div>
          </g-col>
          <g-col span="8">
            <div>8</div>
          </g-col>
          <g-col span="8">
            <div>8</div>
          </g-col>
        </g-row>
        <g-row>
          <g-col span="6" :wide-pc="{span:3,offset:1}">
            <div>6</div>
          </g-col>
          <g-col span="6">
            <div>6</div>
          </g-col>
          <g-col span="6">
            <div>6</div>
          </g-col>
          <g-col span="6">
            <div>6</div>
          </g-col>
        </g-row>
        
        <g-row>
          <g-col span="4">
            <div>4</div>
          </g-col>
          <g-col span="4">
            <div>4</div>
          </g-col>
          <g-col span="4">
            <div>4</div>
          </g-col>
          <g-col span="4">
            <div>4</div>
          </g-col>
          <g-col span="4">
            <div>4</div>
          </g-col>
          <g-col span="4">
            <div>4</div>
          </g-col>
        </g-row>
      </div>
      
    </div>
  </div>
</template>

<script>
import GCol from './grid/col'
import GRow from './grid/row'
import GIcon from './icon'


export default {
  name: 'grid-demo',
  components: { GCol, GRow, GIcon },
  data () {
    return {
      codeStr: `
<g-row>
    <g-col span="8">
        <div>8</div>
    </g-col>
    <g-col span="8">
        <div>8</div>
    </g-col>
    <g-col span="8">
        <div>8</div>
    </g-col>
</g-row>

<g-row>
    <g-col span="6">
        <div>6</div>
    </g-col>
    <g-col span="6">
        <div>6</div>
    </g-col>
    <g-col span="6">
        <div>6</div>
    </g-col>
    <g-col span="6">
        <div>6</div>
    </g-col>
</g-row>

<g-row>
    <g-col span="4">
        <div>4</div>
    </g-col>
    <g-col span="4">
        <div>4</div>
    </g-col>
    <g-col span="4">
        <div>4</div>
    </g-col>
    <g-col span="4">
        <div>4</div>
    </g-col>
    <g-col span="4">
        <div>4</div>
    </g-col>
    <g-col span="4">
        <div>4</div>
    </g-col>
</g-row>
        `.replace(/^ {8}/gm, '').trim(),
      codeStr2: `
<g-row gutter="6">
    <g-col span="11">
        <div></div>
    </g-col>
    <g-col span="11">
        <div></div>
    </g-col>
</g-row>
<g-row gutter="6">
    <g-col span="5">
        <div></div>
    </g-col>
    <g-col span="5">
        <div></div>
    </g-col>
    <g-col span="5">
        <div></div>
    </g-col>
    <g-col span="5">
        <div></div>
    </g-col>
</g-row>
        `.replace(/^ {8}/gm, '').trim(),
      codeStr3: `
<g-row align="left">
    <g-col span="8">
        <div></div>
    </g-col>
    <g-col span="8">
        <div></div>
    </g-col>
</g-row>
<g-row align="center">
    <g-col span="8">
        <div></div>
    </g-col>
    <g-col span="8">
        <div></div>
    </g-col>
</g-row>
</div>
<g-row align="right">
    <g-col span="8">
        <div></div>
    </g-col>
    <g-col span="8">
        <div></div>
    </g-col>
</g-row>`.replace(/^ {8}/gm, '').trim(),
      codeStr4: `
<g-row>
    <g-col span="8" offset="8">
        <div>8</div>
    </g-col>
    <g-col span="8">
        <div>8</div>
    </g-col>
</g-row>
<g-row>
    <g-col span="6">
        <div>6</div>
    </g-col>
    <g-col span="6">
        <div>6</div>
    </g-col>
    <g-col span="6" offset="6">
        <div>6</div>
    </g-col>
</g-row>
                `.replace(/^ {8}/gm, '').trim(),
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
