<template>
  <div class="child">
    {{sourceItem.name}}
    <cascader-item :sourceItem="item1" v-for="item1 in sourceItem.children" v-if="sourceItem.children"></cascader-item>
  </div>
</template>

<script>
  export default {
    name: 'cascaderItem',
    props: {
      sourceItem: {
        default: Object
      }
    }
  }
</script>

<style scoped lang="scss">
  .child {
    padding: 5px;
    border: 1px solid red;
  }
</style>
