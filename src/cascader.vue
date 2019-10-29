<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible=!popoverVisible">
      <slot></slot>
    </div>
    <div class="popover" v-if="popoverVisible">
      <cascader-items :children="source"></cascader-items>
    </div>
  </div>
</template>

<script>
  import cascaderItems from './cascader-items'

  export default {
    name: 'cascader',
    props: {
      source: {
        default: Array,
      }
    },
    components: {
      cascaderItems
    },
    data () {
      return {
        popoverVisible: false
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
