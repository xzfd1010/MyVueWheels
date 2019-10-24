<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
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
    created () {
      // todo 需要触发
      // this.$emit('update:selected','xxx')
    }
  }
</script>

<style scoped lang="scss">

</style>
