<template>
  <div class="my-sub-nav">
    <span @click="open = !open">
      <slot name="title"></slot>
    </span>
    <div class="my-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MySubNav',
    data () {
      return {
        open: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .my-sub-nav {
    position: relative;
    > span {
      padding: 10px 20px;
      display: block;
    }
    &-popover {
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid black;
      white-space: nowrap;
    }
  }
  .my-sub-nav .my-sub-nav-popover .my-sub-nav-popover {
    top: 0;
    left: 100%;
    margin-left: 8px;
  }

</style>
