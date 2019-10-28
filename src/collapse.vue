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
        // 根据single判断，是否需要折叠其他的
        if (this.single) {
          this.selected.splice(0, this.selected.length, name)
        } else {
          this.selected.push(name)
        }
        this.$emit('update:selected', this.selected)
        this.eventBus.$emit('update:selected', this.selected)
      })

      this.eventBus.$on('update:removeSelected', (name) => {
        // 根据single判断，是否需要折叠其他的
        let index = this.selected.indexOf(name)
        this.selected.splice(index, 1)
        this.$emit('update:selected', this.selected) // 把选中项传给用户
        this.eventBus.$emit('update:selected', this.selected) // 把选中项传给子组件

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
