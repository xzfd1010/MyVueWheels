<template>
  <div class="tabs-item" @click="changeTab" :class="classes">
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
    data () {
      return {
        active: false
      }
    },
    computed: {
      classes () {
        return { active: this.active }
      }
    },
    methods: {
      changeTab () {
        // 切换tab
        this.eventBus.$emit('update:selected', this.name)
      }
    },
    created () {
      // 监听事件
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name
      })
    }
  }
</script>

<style scoped lang="scss">
  .tabs-item {
    /*flex-grow: 1;*/
    flex-shrink: 0;
    padding: 0 2em;
    &.active {
      background: red;
    }
  }
</style>
