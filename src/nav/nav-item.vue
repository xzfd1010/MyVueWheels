<template>
  <div :class="{selected,vertical}" :data-name="name" @click="onClick"
       class="my-nav-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'MyNavItem',
    inject: ['root', 'vertical'],
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
        this.$emit('update:selected', this.name)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/var";
  .my-nav-item {
    padding: 10px 20px;
    &:not(.vertical) {
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
    &.vertical {
      &.selected {
        position: relative;
        color: $blue;
        background: $grey;
        &::after {
          display: none;
        }
      }
    }
  }
  a {
    color: inherit;
    text-decoration: none;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
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
