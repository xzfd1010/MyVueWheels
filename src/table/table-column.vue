<template>
  <div></div>
</template>

<script>
export default {
  name: 'GTableColumn',
  props: {
    text: {
      type: String,
      required: true
    },
    field: {
      type: String,
    },
    width: {
      type: Number
    }
  }
}
</script>

<style scoped lang="scss">

</style>
