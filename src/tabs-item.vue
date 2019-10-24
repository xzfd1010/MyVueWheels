<template>
  <div class="tabs-item" @click="xxx">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tabs-item',
    inject: ['eventBus'],
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String | Number,
        required: true
      }
    },
    methods: {
      xxx () {
        // 触发事件
        this.eventBus.$emit('update:selected', this.name)
      }
    },
    created () {
      // 监听事件
      this.eventBus.$on('update:selected', (name) => {
        console.log(name)
      })
    }
  }
</script>

<style scoped lang="scss">

</style>
