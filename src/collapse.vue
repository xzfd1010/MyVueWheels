<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'collapse',
    props: {
      selected: {
        type: Array
      },
      single: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        eventBus: new Vue()
      }
    },
    provide () {
      return {
        eventBus: this.eventBus
      }
    },
    mounted () {
      // 初始化tab
      this.eventBus.$emit('update:selected', this.selected)
      // 监听传回的数据
      this.eventBus.$on('update:addSelected', (name) => {
        let selectedCopy = JSON.parse(JSON.stringify(this.selected))
        // 根据single判断，是否需要折叠其他的
        if (this.single) {
          selectedCopy = [name]
        } else {
          selectedCopy.push(name)
        }
        this.$emit('update:selected', selectedCopy)
        this.eventBus.$emit('update:selected', selectedCopy)
      })

      this.eventBus.$on('update:removeSelected', (name) => {
        let selectedCopy = JSON.parse(JSON.stringify(this.selected))
        // 根据single判断，是否需要折叠其他的
        let index = selectedCopy.indexOf(name)
        selectedCopy.splice(index, 1)
        this.$emit('update:selected', selectedCopy) // 把选中项传给用户
        this.eventBus.$emit('update:selected', selectedCopy) // 把选中项传给子组件

      })
    }
  }
</script>

<style scoped lang="scss">
  $grey: #ddd;
  $border-radius: 4px;
  .collapse {
    border: 1px solid $grey;
    border-radius: $border-radius;
  }
</style>
