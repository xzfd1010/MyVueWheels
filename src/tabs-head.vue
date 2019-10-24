<template>
  <div class="tabs-head">
    <slot></slot>
    <slot name="actions"></slot>
  </div>
</template>

<script>
  export default {
    name: 'tabs-head',
    inject: ['eventBus']
  }
</script>

<style scoped lang="scss">

</style>
