<template>
  <div class="toast">
    <div class="message">
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="$slots.default[0]"></div>
    </div>
    <!--    todo 这里也要改，closeButton现在一直都存在  -->
    <span class="close" v-if="closeButton" @click.stop="onClickClose" ref="button">
      {{closeButton.text}}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      autoClose: {
        type: Boolean,
        default: true
      },
      autoCloseDelay: {
        type: Number,
        default: 50
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
      }
    },
    methods: {
      close () {
        this.$el.remove() // destroy不会删掉元素
        this.$destroy()
      },
      onClickClose () {
        this.close()
        this.closeButton.callback()
      }
    },
    mounted () {
      if (this.autoClose) {
        setTimeout(() => {
          this.close()
        }, this.autoCloseDelay * 1000)
      }
      this.$nextTick(() => {
        this.$refs.button.style.height = this.$el.getBoundingClientRect().height + 'px'
      })
    }
  }
</script>

<style scoped lang="scss">
  $font-size: 14px;
  $toast-height: 40px;
  $toast-bg: rgba(0, 0, 0, 0.75);
  .toast {
    font-size: $font-size;
    line-height: 1.8;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
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
