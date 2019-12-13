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
  @import "../../styles/var";
  .my-sub-nav {
    position: relative;
    > span {
      padding: 10px 20px;
      display: block;
    }
    &-popover {
      background: #fff;
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 1px;
      white-space: nowrap;
      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $border-radius;
      font-size: $font-size;
      color: $light-color;
      min-width: 8em;
    }
  }
  .my-sub-nav .my-sub-nav-popover .my-sub-nav-popover {
    top: 0;
    left: 100%;
    margin-left: 8px;
  }

</style>
