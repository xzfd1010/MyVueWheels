<template>
  <div class="my-sub-nav" :class="{active}" v-click-out-side="close">
    <span @click="open = !open" class="my-sub-nav-label">
      <slot name="title"></slot>
      <span class="my-sub-nav-icon" :class="{open}">
        <icon name="right"></icon>
      </span>
    </span>
    <!--  垂直和水平的动画不能混用  -->
    <template v-if="vertical">
      <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
        <div class="my-sub-nav-popover" v-show="open" :class="{vertical}">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="my-sub-nav-popover" v-show="open">
        <slot></slot>
      </div>
    </template>

  </div>
</template>

<script>
  import ClickOutSide from '@/click-outside'
  import Icon from '@/icon'

  export default {
    name: 'MySubNav',
    inject: ['root', 'vertical'],
    directives: { ClickOutSide },
    components: { Icon },
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        open: false,
      }
    },
    computed: {
      active () {
        return this.root.namePath.indexOf(this.name) > -1
      }
    },
    methods: {
      enter (el, done) {
        let { height } = el.getBoundingClientRect()
        el.style.height = '0'
        el.getBoundingClientRect()
        el.style.height = `${height}px`
        // 如果用同步的方式对同一个属性进行赋值，浏览器会对多次赋值进行合并
        // 如果中间做了一个必须算出高度的操作，比如 el.getBoundingClientRect 就能够让 height=0 生效
        // transitionend 可能存在浏览器兼容性问题
        el.addEventListener('transitionend', () => {
          done()
        })
      },
      afterEnter (el) {
        el.style.height = 'auto'
      },
      leave (el, done) {
        let { height } = el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.getBoundingClientRect()
        el.style.height = '0'
        // 如果用同步的方式对同一个属性进行赋值，浏览器会对多次赋值进行合并
        // 如果中间做了一个必须算出高度的操作，比如 el.getBoundingClientRect 就能够让 height=0 生效
        el.addEventListener('transitionend', () => {
          done()
        })
      },
      afterLeave (el) {
        el.style.height = 'auto'
      },
      updateNamePath () {
        this.$parent.updateNamePath && this.$parent.updateNamePath()
        this.root.namePath.unshift(this.name)
      },
      close () {
        this.open = false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/var";
  .my-sub-nav {
    position: relative;
    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
    &-label {
      display: block;
      padding: 10px 20px;
    }
    &-icon {
      display: none;
    }
    &-popover {
      background: #fff;
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 1px;
      white-space: nowrap;
      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $border-radius;
      font-size: $font-size;
      color: $light-color;
      min-width: 8em;
      transition: all 300ms linear;
      /*overflow-y: hidden;*/
      &.vertical {
        position: static;
        border: none;
        border-radius: 0;
        box-shadow: none;
        overflow: hidden;
      }
    }
  }
  .my-sub-nav .my-sub-nav {
    &.active {
      &::after {
        display: none;
      }
    }
    .my-sub-nav-popover {
      top: 0;
      left: 100%;
      margin-left: 8px;
    }
    .my-sub-nav-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .my-sub-nav-icon {
      display: inline-flex;
      margin-left: 0.5em;
      transition: transform 300ms;
      &.open {
        transform: rotate(180deg);
      }
      svg {
        fill: $light-color;
      }
    }
  }

</style>
