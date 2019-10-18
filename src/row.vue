<template>
  <div class="row" :style="{marginLeft:-gutter/2+'px',marginRight:-gutter/2+'px'}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'my-row',
    props: {
      gutter: {
        type: [Number, String]
      }
    },
    mounted () {
      // 挂载的时候能够拿到$children
      this.$children.forEach(vm => {
        vm.gutter = this.gutter
      })
    }
  }
</script>

<style scoped lang="scss">
  .row {
    width: 100%;
    display: flex;
  }
</style>
