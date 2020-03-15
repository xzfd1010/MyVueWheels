<template>
  <div class="tabs-head" ref="head">
    <slot></slot>
    <!--  slot上面不能加class  -->
    <div class="line" ref="line" v-show="lineVisible"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabs-head',
  inject: ['eventBus'],
  data () {
    return {
      lineVisible: false
    }
  },
  mounted () {
    // 这里控制线的偏移量
    this.eventBus.$on('update:selected', (name, vm) => {
      this.lineVisible = true
      const { width, left } = vm.$el.getBoundingClientRect()
      const { left: left2 } = this.$refs.head.getBoundingClientRect()
      this.$refs.line.style.width = `${width}px`
      this.$refs.line.style.transform = `translateX(${left - left2}px)`
    })
  }
}
</script>

<style lang="scss" scoped>
  $tab-height: 40px;
  $blue: deepskyblue;
  $grey: #ccc;
  .tabs-head {
    position: relative;
    height: $tab-height;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 1em;
    border-bottom: 1px solid #ccc;
    > .actions-wrapper {
      margin-left: auto;
    }
    > .line {
      position: absolute;
      bottom: 0;
      border-bottom: 1px solid $blue;
      transition: all .3s;
    }
  }
</style>
