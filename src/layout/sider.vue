<template>
  <transition name="slide">
    <div class="sider" v-if="visible">
      <slot></slot>
<!--      <n-button @click="visible=false" icon="left" circle v-if="visible"></n-button>-->
<!--      <n-button @click="visible=true" icon="right" circle v-else></n-button>-->
    </div>
  </transition>
</template>

<script>
import NButton from '../button/button'

export default {
  name: 'sider',
  components: { NButton },
  data () {
    return {
      visible: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .sider {
    position: relative;
    width: 200px;
    > button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .3s;
  }
  .slide-enter, .slide-leave-to {
    margin-left: -200px;
  }
</style>
