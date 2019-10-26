<template>
  <div class="popover" ref="popover" @click="onClick">
    <div class="content-wrapper" ref="contentWrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <div class="trigger" ref="triggerWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'popover',
    data () {
      return {
        visible: false
      }
    },
    methods: {
      onClickDocument (e) {
        // 3部分，按钮，内容，其他区域；这里的逻辑应该是
        if (this.$refs.popover.contains(e.target) || this.$refs.contentWrapper.contains(e.target)) return
        this.close()
      },
      positionContent () {
        document.body.appendChild(this.$refs.contentWrapper)
        let position = this.$refs.triggerWrapper.getBoundingClientRect()
        this.$refs.contentWrapper.style.left = (window.scrollX + position.left) + 'px'
        this.$refs.contentWrapper.style.top = (window.scrollY + position.top) + 'px'
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
  .popover {
    display: inline-block;
  }
  .content-wrapper {
    position: absolute;
    border: 1px solid red;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    transform: translateY(-100%);
  }
</style>
