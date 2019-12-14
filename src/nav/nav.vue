<template>
  <div :class="{vertical}" class="my-nav">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'MyNav',
    provide () {
      return {
        root: this,
        vertical: this.vertical
      }
    },
    props: {
      selected: {
        type: String,
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        items: [],
        namePath: []
      }
    },
    methods: {
      addItem (vm) {
        this.items.push(vm)
      },
      updateChildren () {
        this.items.forEach(vm => {
          vm.selected = this.selected.indexOf(vm.name) >= 0
        })
      },
      listenToChildren () {
        this.items.forEach(vm => {
          vm.$on('update:selected', (name) => {
            this.$emit('update:selected', name)
          })
        })
      }
    },
    updated () {
      this.updateChildren()
    },
    mounted () {
      this.updateChildren()
      this.listenToChildren()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/var";
  .my-nav {
    display: flex;
    border-bottom: 1px solid $grey;
    color: $color;
    cursor: default;
    user-select: none;
    &.vertical {
      flex-direction: column;
      border: 1px solid $grey;
    }
  }
</style>
