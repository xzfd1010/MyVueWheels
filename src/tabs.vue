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
    created () {
      this.eventBus.$on('update:selected', (value) => {
        this.$emit('update:selected', value) // 把value传递出去
      })
    }
  }
</script>

<style scoped lang="scss">

</style>
