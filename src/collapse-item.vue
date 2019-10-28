<template>
  <div class="collapse-item">
    <div class="title" @click="toggle" :data-name="name">{{title}}</div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'collapse-item',
    props: {
      title: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    inject: ['eventBus'],
    data () {
      return {
        open: false
      }
    },
    methods: {
      // 传给父组件数据
      toggle () {
        if (this.open) {
          this.eventBus.$emit('update:removeSelected', this.name)
        } else {
          this.eventBus.$emit('update:addSelected', this.name)
        }
      }
    },
    mounted () {
      // 通知子组件，哪些应该展开
      this.eventBus.$on('update:selected', (selected) => {
        this.open = selected.indexOf(this.name) > -1
      })
    }
  }
</script>

<style scoped lang="scss">
  $grey: #ddd;
  $border-radius: 4px;
  .collapse-item {
    // border: 1px solid $grey;
    border-radius: $border-radius;
    box-sizing: border-box;
    > .title {
      padding: 0 8px;
      border-bottom: 1px solid $grey;
      min-height: 32px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
    > .content {
      min-height: 32px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      border-bottom: 1px solid $grey;
      box-sizing: border-box;
    }
    &:last-child {
      .title {
        border-bottom: none;
      }
      > .content {
        border-top: 1px solid $grey;
        border-bottom: none;
      }
    }
  }
</style>
