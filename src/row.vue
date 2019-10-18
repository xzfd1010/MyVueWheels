<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'my-row'
  }
</script>

<style scoped lang="scss">
  .row {
    width: 100%;
    display: flex;
  }
</style>
