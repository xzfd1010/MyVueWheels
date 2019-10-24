<template>
  <div class="tabs-pane">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tabs-pane',
    inject: ['eventBus'],
    props: {
      name: {
        type: String | Number,
        required: true
      }
    },
    created () {
      // 监听事件
      this.eventBus.$on('update:selected', (name) => {
        console.log(name)
      })
    }
  }
</script>

<style scoped lang="scss">

</style>
