<template>
  <transition name="slide">
    <div class="slides-item" v-if="visible" :class="{reverse}">
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

<style scoped lang="scss">
  .slide-enter-active, .slide-leave-active {
    transition: transform 1s;
  }
  .slide-enter {
    transform: translateX(100%);
    &.reverse {
      transform: translateX(-100%);
    }
  }
  /*.slide-enter-to, .slide-leave {*/
  /*  transform: translateX(0);*/
  /*}*/
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
</style>
