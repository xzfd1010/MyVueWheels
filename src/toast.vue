<template>
  <div class="wrapper" :class="toastClasses">
    <div class="toast">
      <div class="message">
        <!--        <slot>-->
        <div v-if="!enableHtml">{{message}}</div>
        <div v-else v-html="message"></div>
        <!--        </slot>-->
      </div>
      <!--    todo 这里也要改，closeButton现在一直都存在  -->
      <span class="close" v-if="showClose" @click.stop="onClickClose" ref="button">
      {{closeButton.text}}
    </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      autoClose: {
        type: [Boolean, Number],
        default: 3,
        validator (value) {
          return value === false || typeof value === 'number'
        }
      },
      showClose: {
        type: Boolean,
        default: false
      },
      closeButton: {
        type: Object,
        default: () => {
          return {
            text: '关闭',
            callback: () => {}
          }
        }
      },
      enableHtml: {
        type: Boolean,
        default: false
      },
      message: {
        default: ''
      },
      position: {
        type: String,
        default: 'top',
        validator (value) {
          return ['top', 'bottom', 'middle'].includes(value)
        }
      }
    },
    computed: {
      toastClasses () {
        return { [`position-${this.position}`]: true }
      }
    },
    methods: {
      execAutoClose () {
        if (this.autoClose) {
          setTimeout(() => {
            this.close()
          }, this.autoClose * 1000)
        }
      },
      close () {
        this.$el.remove() // destroy不会删掉元素
        this.$emit('close')
        this.$destroy()
      },
      onClickClose () {
        this.close()
        if (this.closeButton && typeof this.closeButton.callback === 'function') {
          this.closeButton.callback()
        }
      },
      updateStyles () {
        this.$nextTick(() => {
          this.showClose ? this.$refs.button.style.height = this.$el.getBoundingClientRect().height + 'px' : ''
        })
      }
    },
    mounted () {
      this.execAutoClose()
      this.updateStyles()

    },
  }
</script>

<style scoped lang="scss">
  $font-size: 14px;
  $toast-height: 40px;
  $toast-bg: rgba(0, 0, 0, 0.75);
  $animation-duration: 300ms;
  @keyframes slide-up {
    0% {transform: translateY(100%);}
    100% {transform: translateY(0%);}
  }
  @keyframes slide-down {
    0% {transform: translateY(-100%);}
    100% {transform: translateY(0%);}
  }
  @keyframes fade-in {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
  .wrapper {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    &.position-top {
      top: 0;
      .toast {
        animation: slide-down $animation-duration;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
    &.position-bottom {
      bottom: 0;
      .toast {
        animation: slide-up $animation-duration;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    &.position-middle {
      top: 50%;
      transform: translate(-50% -50%);
      .toast {
        animation: fade-in $animation-duration;
      }
    }
  }
  .toast {
    font-size: $font-size;
    line-height: 1.8;
    display: flex;
    align-items: center;
    color: white;
    background: $toast-bg;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
    padding: 0 16px;
    > .message {
      padding: 8px 0;
    }
  }
  .close {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    padding-left: 16px;
    margin-left: 16px;
    flex-shrink: 0;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      border-left: 1px solid #666;
    }
  }
</style>
