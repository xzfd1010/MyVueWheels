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
        return { active: this.active, disabled: this.disabled }
      }
    },
    methods: {
      changeTab () {
        // 切换tab
        if (this.disabled) return
        this.eventBus.$emit('update:selected', this.name, this)
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
  $blue: deepskyblue;
  $disabled-text-color: #666;
  .tabs-item {
    display: flex;
    align-items: center;
    /*flex-grow: 1;*/
    flex-shrink: 0;
    padding: 0 2em;
    cursor: pointer;
    height: 100%;
    &.active {
      color: $blue;
      font-weight: bold;
    }
    &.disabled {
      color: $disabled-text-color;
      cursor: not-allowed;
    }
  }
</style>
