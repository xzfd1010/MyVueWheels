<template>
  <div class="my-nav-item" :class="{selected}" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'MyNavItem',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        selected: false
      }
    },
    methods: {
      onClick () {
        this.$emit('add:selected', this.name)
      }
    }
  }
</script>

<style scoped lang="scss">
  .my-nav-item {
    padding: 10px 20px;
    &.selected {
      color: red;
    }
  }
</style>
