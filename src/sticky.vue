<template>
  <div class="n-sticky-wrapper" ref="wrapper" :style="{height}">
    <div class="n-sticky" :class="classes" :style="{top,left,width}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sticky',
    props: {
      distance: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        sticky: false,
        top: undefined,
        left: undefined,
        width: undefined,
        height: undefined,
        offsetTop: undefined,
      }
    },
    methods: {
      getOffsetTop () {
        let { top } = this.$refs.wrapper.getBoundingClientRect()
        return top + window.scrollY
      },
      _windowScrollHandler () {
        if (window.scrollY > this.offsetTop) {
          let { height, left, width } = this.$refs.wrapper.getBoundingClientRect()
          this.height = `${height}px`
          this.left = `${left}px`
          this.width = `${width}px`
          this.top = `${this.distance}px`
          this.sticky = true
        } else {
          this.height = undefined
          this.left = undefined
          this.width = undefined
          this.top = undefined
          this.sticky = false
        }
      }
    },
    computed: {
      classes () {
        return { sticky: this.sticky }
      }
    },
    mounted () {
      this.offsetTop = this.getOffsetTop() - this.distance
      this.windowScrollHandler = this._windowScrollHandler.bind(this)
      window.addEventListener('scroll', this.windowScrollHandler)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.windowScrollHandler)
    },
  }
</script>

<style scoped lang="scss">
  .n-sticky {
    &.sticky {
      position: fixed;
    }
  }
</style>
