<template>
  <div class="popover" ref="popover">
    <transition name="fade">
      <div class="content-wrapper" ref="contentWrapper" v-show="visible" :class="{[`position-${position}`]:true}">
        <slot name="content" :close="close"></slot>
      </div>
    </transition>
    <span class="trigger" ref="triggerWrapper" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'popover',
    props: {
      position: {
        default: 'top',
        validator (value) {
          return ['top', 'bottom', 'left', 'right'].indexOf(value) > -1
        }
      },
      trigger: {
        default: 'click',
        validator (value) {
          return ['click', 'hover'].indexOf(value) > -1
        }
      }
    },
    data () {
      return {
        visible: false
      }
    },
    mounted () {
      let triggerWrapper = this.$refs.triggerWrapper
      const contentWrapper = this.$refs.contentWrapper
      if (this.trigger === 'click') {
        this.$refs.popover.addEventListener('click', this.onClick)
      } else {
        triggerWrapper.addEventListener('mouseenter', this.handleMouseEnter)
        triggerWrapper.addEventListener('mouseleave', this.handleMouseLeave)
        contentWrapper.addEventListener('mouseenter', this.handleMouseEnter)
        contentWrapper.addEventListener('mouseleave', this.handleMouseLeave)
      }
    },
    destroyed () {
      if (this.trigger === 'click') {
        document.removeEventListener('click', this.onClickDocument)
        this.$refs.popover.removeEventListener('click', this.onClick)
      } else {
        this.$refs.triggerWrapper.removeEventListener('mouseenter', this.handleMouseEnter)
        this.$refs.triggerWrapper.removeEventListener('mouseleave', this.handleMouseLeave)
        this.$refs.contentWrapper.removeEventListener('mouseenter', this.handleMouseEnter)
        this.$refs.contentWrapper.removeEventListener('mouseleave', this.handleMouseLeave)
      }
    },
    methods: {
      handleMouseLeave () {
        clearTimeout(this._timer)
        this._timer = setTimeout(() => {
          this.close()
        }, 200)
      },
      handleMouseEnter () {
        clearTimeout(this._timer)
        this._timer = setTimeout(() => {
          console.log('open')
          this.open()
        }, 200)
      },
      onClickDocument (e) {
        if (this.$refs.popover && this.$refs.popover.contains(e.target)) return // 判断点击的是否是popover
        if (this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)) return // contentWrapper移到外面，需要单独判断
        this.close()
      },
      positionContent () {
        const { contentWrapper, triggerWrapper } = this.$refs
        document.body.appendChild(contentWrapper)
        const { left, top, width, height } = triggerWrapper.getBoundingClientRect()
        const { height: height2 } = contentWrapper.getBoundingClientRect()
        let diff = (height - height2) / 2
        let x = {
          top: {
            left: window.scrollX + left,
            top: window.scrollY + top
          },
          bottom: {
            left: window.scrollX + left,
            top: window.scrollY + top + height
          },
          left: {
            left: window.scrollX + left,
            top: window.scrollY + top + diff
          },
          right: {
            left: window.scrollX + left + width,
            top: window.scrollY + top + diff
          }
        }
        contentWrapper.style.left = x[this.position].left + 'px'
        contentWrapper.style.top = x[this.position].top + 'px'
      },
      open () {
        this.visible = true
        this.$nextTick(() => {
          this.positionContent()
          document.addEventListener('click', this.onClickDocument)
        })
      },
      close () {
        this.visible = false
        document.removeEventListener('click', this.onClickDocument)
      },
      onClick (event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
          if (!this.visible) {
            this.open()
          } else {
            this.close()
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $border-color: #333;
  $border-radius: 4px;
  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .popover {
    display: inline-block;
  }
  .content-wrapper {
    position: absolute;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
    background: white;
    padding: .5em 1em;
    max-width: 20em;
    word-break: break-all;
    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid transparent;
    }
    &.position-top {
      transform: translateY(-100%);
      margin-top: -10px;
      &:before, &:after {
        border-bottom: none;
        left: 10px;
      }
      &:before {
        border-top-color: $border-color;
        top: 100%;
      }
      &:after {
        border-top-color: white;
        top: calc(100% - 1px);
      }
    }
    &.position-bottom {
      margin-top: 10px;
      &:before, &:after {
        left: 10px;
        border-top: none;
      }
      &:before {
        border-bottom-color: $border-color;
        bottom: 100%;
      }
      &:after {
        border-bottom-color: white;
        bottom: calc(100% - 1px);
      }
    }
    &.position-left {
      transform: translateX(-100%);
      margin-left: -10px;
      &:before, &:after {
        top: 50%;
        border-right: none;
        transform: translateY(-50%);
      }
      &:before {
        border-left-color: $border-color;
        left: 100%;
      }
      &:after {
        border-left-color: white;
        left: calc(100% - 1px);
      }
    }
    &.position-right {
      margin-left: 10px;
      &:before, &:after {
        border-left: none;
        top: 50%;
        transform: translateY(-50%);
      }
      &:before {
        border-right-color: $border-color;
        right: 100%;
      }
      &:after {
        border-right-color: white;
        right: calc(100% - 1px);
      }
    }
  }
</style>
