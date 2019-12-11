<template>
  <div class="slides">
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
        lastSelectedIndex: undefined
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
        let index = this.names.indexOf(this.getSelected()) // 当前选中项
        // 正向
        // let run = () => {
        //   if (index === names.length - 1) {
        //     index = -1
        //   }
        //   this.$emit('update:selected', names[++index])
        //   console.log(`index=${index}`)
        //   setTimeout(run, 3000)
        // }
        let run = () => {
          if (index === 0) {
            index = 3
          }
          // this.$emit('update:selected', this.names[--index])
          index--
          this.select(index)
          setTimeout(run, 3000)
        }
        // setTimeout(run, 3000)
      },
      select (index) {
        this.lastSelectedIndex = this.selectedIndex // 记录下来上次选中的值
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
          vm.reverse = this.selectedIndex <= this.lastSelectedIndex
          this.$nextTick(()=>{
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
    },
    updated () {
      this.updateChildren()
    }
  }
</script>

<style scoped lang="scss">
  .slides {
    border: 1px solid #000;
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
