<template>
  <div @mouseenter="onMouseEnter"
       @mouseleave="onMouseLeave"
       @touchend="onTouchEnd"
       @touchmove="onTouchMove"
       @touchstart="onTouchStart"
       class="slides">
    <div class="slides-window">
      <slot></slot>
    </div>
    <div class="slides-dots">
      <span @click="onClickPrev">
        <icon name="left"></icon>
      </span>
      <span :class="{active: selectedIndex === n-1}" :data-index="n-1"
            :key="n"
            @click="select(n-1)"
            v-for="n in childrenLength">{{n}}</span>
      <span @click="onClickNext">
        <icon name="right"></icon>
      </span>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon'

  export default {
    name: 'slides',
    components: { Icon },
    props: {
      selected: {
        type: String
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      autoplayDelay: {
        type: Number,
        default: 3000
      }
    },
    data () {
      return {
        startTouch: undefined, // 初始位置
        childrenLength: 0,
        lastSelectedIndex: undefined,
        timeId: undefined,
      }
    },
    computed: {
      names () {
        return this.items.map(vm => vm.name)
      },
      selectedIndex () {
        let selectedIndex = this.names.indexOf(this.selected)
        return selectedIndex < 0 ? 0 : selectedIndex
      },
      items () {
        return this.$children.filter(vm => vm.$options.name === 'slides-item')
      }
    },
    methods: {
      onClickPrev () {
        this.select(this.selectedIndex - 1)
      },
      onClickNext () {
        this.select(this.selectedIndex + 1)
      },
      playAutomatically () {
        if (!this.autoplay) return
        if (this.timerId) return
        let index = this.names.indexOf(this.getSelected()) // 当前选中项
        // 正向
        let run = () => {
          this.select(++index)
          this.timerId = setTimeout(run, this.autoplayDelay)
        }
        // 反向
        // let run = () => {
        //   index--
        //   this.select(index)
        //   setTimeout(run, 3000)
        // }
        this.timerId = setTimeout(run, this.autoplayDelay)
      },
      onMouseEnter () {
        this.pause()
      },
      onMouseLeave () {
        this.playAutomatically() // 如果已经执行动画的话，不再创建新的计时器
      },
      onTouchStart (e) {
        this.pause()
        this.startTouch = e.touches[0]
      },
      onTouchMove (e) {
      },
      onTouchEnd (e) {
        let endTouch = e.changedTouches[0]
        let { clientX: x1, clientY: y1 } = this.startTouch
        let { clientX: x2, clientY: y2 } = endTouch

        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        let deltaY = Math.abs(y2 - y1)
        let ratio = distance / deltaY
        if (ratio > 2) {
          // 认为是水平移动
          if (x1 - x2 > 0) {
            // 手指向左
            this.select(this.selectedIndex + 1)
          } else {
            // 手指向右
            this.select(this.selectedIndex - 1)
          }
        }
        this.$nextTick(() => {
          this.startTouch = undefined
          this.playAutomatically()
        })
      },
      pause () {
        window.clearTimeout(this.timerId)
        this.timerId = undefined
      },
      select (index) {
        this.lastSelectedIndex = this.selectedIndex // 记录上次选中的值
        // 边界判断
        if (index === this.childrenLength) {index = 0}
        if (index === -1) {index = this.childrenLength - 1}
        this.$emit('update:selected', this.names[index])
      },
      getSelected () {
        let first = this.items[0]
        return this.selected || first.name
      },
      updateChildren () {
        let selected = this.getSelected()
        this.items.forEach((vm) => {
          // 告知子元素应该如何执行动画
          // let newIndex = this.names.indexOf(selected) // 只有在父组件中能够拿到所有的名字
          let reverse = this.selectedIndex <= this.lastSelectedIndex
          if (this.timerId || this.startTouch) {
            // 自动播放时，处理最后一张和第一张的边界情况
            if (this.lastSelectedIndex === this.childrenLength - 1 && this.selectedIndex === 0) {
              reverse = false
            }
            if (this.lastSelectedIndex === 0 && this.selectedIndex === this.childrenLength - 1) {
              reverse = true
            }
          }
          vm.reverse = reverse
          this.$nextTick(() => {
            vm.selected = selected
          })
        })
      }
    },
    mounted () {
      this.updateChildren()
      this.playAutomatically()
      this.childrenLength = this.items.length
    },
    updated () {
      this.updateChildren()
    }
  }
</script>

<style lang="scss" scoped>
  .slides {
    &-window {
      position: relative;
      overflow: hidden;
    }
    &-dots {
      padding: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ddd;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 8px;
        font-size: 12px;
      }
      &:hover {
        cursor: pointer;
      }
      .current {
        background: black;
        color: #fff;
        &:hover {
          cursor: default;
        }
      }
    }
  }

</style>
