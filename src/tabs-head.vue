<template>
  <div class="tabs-head">
    <slot></slot>
    <!--  slot上面不能加class  -->
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabs-head',
    inject: ['eventBus']
  }
</script>

<style scoped lang="scss">
  $tab-height: 40px;
  .tabs-head {
    height: $tab-height;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > .actions-wrapper {
      margin-left: auto;
    }
  }
</style>
