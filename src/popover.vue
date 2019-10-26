<template>
  <div class="popover" ref="popover" @click="onClick">
    <div class="content-wrapper" ref="contentWrapper" v-if="visible" :class="{[`position-${position}`]:true}">
      <slot name="content"></slot>
    </div>
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
      }
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {
      onClickDocument (e) {
        if (this.$refs.popover && this.$refs.popover.contains(e.target)) return // 判断点击的是否是popover
        if (this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)) return // contentWrapper移到外面，需要单独判断
        this.close()
      },
      positionContent () {
        const { contentWrapper, triggerWrapper } = this.$refs
        document.body.appendChild(contentWrapper)
        let position = triggerWrapper.getBoundingClientRect()
        let { height } = contentWrapper.getBoundingClientRect()
        if (this.position === 'top') {
          contentWrapper.style.left = (window.scrollX + position.left) + 'px'
          contentWrapper.style.top = (window.scrollY + position.top) + 'px'
        } else if (this.position === 'bottom') {
          contentWrapper.style.left = (window.scrollX + position.left) + 'px'
          contentWrapper.style.top = (window.scrollY + position.top + position.height) + 'px'
        } else if (this.position === 'left') {
          let diff = (position.height - height) / 2
          contentWrapper.style.left = (window.scrollX + position.left) + 'px'
          contentWrapper.style.top = (window.scrollY + position.top + diff) + 'px'
        } else if (this.position === 'right') {
          let diff = (position.height - height) / 2
          contentWrapper.style.left = (window.scrollX + position.left + position.width) + 'px'
          contentWrapper.style.top = (window.scrollY + position.top + diff) + 'px'
        }

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
    },
    mounted () {
    }
  }
</script>

<style scoped lang="scss">
  $border-color: #333;
  $border-radius: 4px;
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
