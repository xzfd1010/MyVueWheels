<template>
  <div class="slides"
       @mouseenter="onMouseEnter"
       @mouseleave="onMouseLeave">
    <div class="slides-window">
      <slot></slot>
    </div>
    <div class="slides-dots">
      <span v-for="n in childrenLength" :class="{active: selectedIndex === n-1}"
            @click="select(n-1)">{{n-1}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slides',
    props: {
      selected: {
        type: String
      },
      autoplay: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        childrenLength: 0,
        lastSelectedIndex: undefined,
        timeId: undefined
      }
    },
    computed: {
      names () {
        return this.$children.map(vm => vm.name)
      },
      selectedIndex () {
        return this.names.indexOf(this.selected) || 0
      }
    },
    methods: {
      playAutomatically () {
        if (this.timerId) return
        let index = this.names.indexOf(this.getSelected()) // 当前选中项
        // 正向
        let run = () => {
          if (index === this.names.length - 1) {
            index = -1
          }
          this.select(++index)
          console.log(`index=${index}`)
          this.timerId = setTimeout(run, 3000)
        }
        // let run = () => {
        //   if (index === 0) {
        //     index = 3
        //   }
        //   // this.$emit('update:selected', this.names[--index])
        //   index--
        //   this.select(index)
        //   setTimeout(run, 3000)
        // }
        this.timerId = setTimeout(run, 3000)
      },
      onMouseEnter () {
        this.pause()
      },
      onMouseLeave () {
        this.playAutomatically() // 如果已经执行动画的话，不再创建新的计时器
      },
      pause () {
        window.clearTimeout(this.timerId)
        this.timerId = undefined
      },
      select (index) {
        this.lastSelectedIndex = this.selectedIndex // 记录上次选中的值
        this.$emit('update:selected', this.names[index])
      },
      getSelected () {
        let first = this.$children[0]
        return this.selected || first.name
      },
      updateChildren () {
        let selected = this.getSelected()
        this.$children.forEach((vm) => {
          // 告知子元素应该如何执行动画
          // let newIndex = this.names.indexOf(selected) // 只有在父组件中能够拿到所有的名字
          let reverse = this.selectedIndex <= this.lastSelectedIndex
          // 处理最后一张和第一张的边界情况
          if (this.lastSelectedIndex === this.childrenLength - 1 && this.selectedIndex === 0) {
            reverse = false
          }
          if (this.lastSelectedIndex === 0 && this.selectedIndex === this.childrenLength - 1) {
            reverse = true
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
      if (this.autoplay) {
        this.playAutomatically()
      }
      this.childrenLength = this.$children.length
      console.log('selected', this.selectedIndex)
    },
    updated () {
      this.updateChildren()
    }
  }
</script>

<style scoped lang="scss">
  .slides {
    &-window {
      position: relative;
      overflow: hidden;
    }
    &-dots {
      span {
        margin: 10px;
      }
      .active {
        color: red;
      }
    }
  }

</style>
