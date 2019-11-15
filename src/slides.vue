<template>
  <div class="slides">
    <div class="slides-window">
      <slot></slot>
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
    methods: {
      playAutomatically () {
        const names = this.getNames()
        let index = names.indexOf(this.getSelected()) // 当前选中项
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
          this.$emit('update:selected', names[--index])
          // console.log(`index=${index}`)
          setTimeout(run, 3000)
        }
        setTimeout(run, 3000)
      },
      getNames () {
        return this.$children.map(vm => vm.name)
      },
      getSelected () {
        let first = this.$children[0]
        return this.selected || first.name
      },
      updateChildren () {
        let selected = this.getSelected()
        this.$children.forEach((vm) => {
          vm.selected = selected
          // 告知子元素应该如何执行动画
          const names = this.getNames() // 只有在父组件中能够拿到所有的名字
          let newIndex = names.indexOf(selected)
          let oldIndex = names.indexOf(vm.name) // 各元素自己的名字与当前的选中的名字比较，就知道是否应该执行反向动画了
          if(vm.name === selected){
            console.log(`newIndex=${newIndex}, oldIndex=${oldIndex},newIndex<oldIndex ${newIndex < oldIndex}`)
          }
          vm.reverse = newIndex <= oldIndex
        })
      }
    },
    mounted () {
      this.updateChildren()
      if (this.autoplay) {
        this.playAutomatically()
      }
    },
    updated () {
      this.updateChildren()
    }
  }
</script>

<style scoped lang="scss">
  .slides {
    display: inline-block;
    border: 1px solid #000;
    &-window {
      position: relative;
      overflow: hidden;
    }
  }

</style>
