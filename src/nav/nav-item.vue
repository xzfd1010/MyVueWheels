<template>
  <div class="my-nav-item" :class="{selected}" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'MyNavItem',
    inject: ['root'],
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        selected: false
      }
    },
    created () {
      this.root.addItem(this)
    },
    methods: {
      onClick () {
        this.root.namePath = []
        this.$parent.updateNamePath && this.$parent.updateNamePath()
        this.$emit('add:selected', this.name)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/var";
  .my-nav-item {
    padding: 10px 20px;
    &.selected {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
  }
  .my-sub-nav .my-nav-item {
    &.selected {
      color: $color;
      background: $grey;
      &::after {
        display: none;
      }
    }
  }
</style>
