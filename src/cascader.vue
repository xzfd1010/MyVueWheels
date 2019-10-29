<template>
  <div class="cascader">
    <div class="trigger">
      <slot></slot>
    </div>
    <div class="popover">
      <div v-for="item in source">
        <cascader-item :sourceItem="item"></cascader-item>
      </div>
    </div>
  </div>
</template>

<script>
  import cascaderItem from './cascaderItem'

  export default {
    name: 'cascader',
    props: {
      source: {
        default: Array,
      }
    },
    components: {
      cascaderItem
    }
  }
</script>

<style scoped lang="scss">

</style>
