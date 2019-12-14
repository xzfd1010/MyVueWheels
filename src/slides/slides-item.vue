<template>
  <transition name="slide">
    <div :class="{reverse}" class="slide-item" v-if="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'slides-item',
    props: {
      name: {
        type: String,
      }
    },
    data () {
      return {
        selected: '',
        reverse: false
      }
    },
    computed: {
      visible () {
        return this.name === this.selected
      }
    }

  }
</script>

<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: transform 1s;
  }
  .slide-enter {
    transform: translateX(100%);
    &.reverse {
      transform: translateX(-100%);
    }
  }
  .slide-leave-to {
    transform: translateX(-100%);
    &.reverse {
      transform: translateX(100%);
    }
  }
  .slide-leave-active {
    position: absolute;
    left: 0;
    top: 0;
  }
  .slide-item {
    width: 100%;
    height: 100%;
  }
</style>
