<template>
  <svg class="n-icon" @click="$emit('click',$event)">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
  import './svg'

  export default {
    name: 'icon',
    props: ['name']
  }
</script>

<style lang="scss" scoped>
  .n-icon {
    width: 1em;
    height: 1em;
  }
</style>
