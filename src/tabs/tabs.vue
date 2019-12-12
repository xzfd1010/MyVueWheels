<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'tabs',
    props: {
      selected: {
        type: String,
        required: true
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator (value) {
          return ['horizontal', 'vertical'].indexOf(value) > -1
        }
      }
    },
    data () {
      return {
        eventBus: new Vue()
      }
    },
    provide () {
      return { eventBus: this.eventBus }
    },
    methods: {
      checkChildren () {
        if (this.$children.length === 0) {
          throw new Error('tabs的子组件应该是 tabs-head 和 tabs-nav，但你没有写子组件')
        }
      },
      selectTab () {
        this.$children.forEach(vm => {
          if (vm.$options.name === 'tabs-head') {
            vm.$children.forEach(childVm => {
              if (childVm.$options.name === 'tabs-item' && childVm.name === this.selected) {
                this.eventBus.$emit('update:selected', this.selected, childVm)
              }
            })
          }
        })
      }
    },
    mounted () {
      this.checkChildren()
      // 初始化
      this.selectTab()
    }
  }
</script>

<style scoped lang="scss">

</style>
