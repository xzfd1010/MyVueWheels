<template>
  <div>
    <my-button>默认按钮</my-button>
    <my-button icon="settings">设置</my-button>
    <my-button :loading="true">加载中</my-button>
    <my-button disabled>禁用</my-button>

    <pre><code>{{contents}}</code>
    </pre>
  </div>
</template>

<script>
  import Button from '../../../src/button'

  export default {
    name: 'button-demos',
    components: {
      'my-button': Button
    },
    data () {
      return {
        contents: `
        <my-button>默认按钮</my-button>
        <my-button icon="settings">设置</my-button>
        <my-button :loading="true">加载中</my-button>
        <my-button disabled>禁用</my-button>
        `
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
