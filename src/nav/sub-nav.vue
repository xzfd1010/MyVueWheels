<template>
  <div class="my-sub-nav" :class="{active}" v-click-out-side="close">
    <span @click="open = !open">
      <slot name="title"></slot>
    </span>
    <div class="my-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ClickOutSide from '@/click-outside'

  export default {
    name: 'MySubNav',
    inject: ['root'],
    directives: {ClickOutSide},
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        open: false,
      }
    },
    computed: {
      active () {
        return this.root.namePath.indexOf(this.name) > -1
      }
    },
    methods: {
      updateNamePath () {
        this.$parent.updateNamePath && this.$parent.updateNamePath()
        this.root.namePath.unshift(this.name)
      },
      close () {
        this.open = false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/var";
  .my-sub-nav {
    position: relative;
    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
    > span {
      display: block;
      padding: 10px 20px;
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
