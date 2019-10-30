<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible=!popoverVisible">
      <slot></slot>
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items :children="source" :height="height" class="popover" :selected="selected"
                      :level="level" @update:selected="updateSelected"></cascader-items>
    </div>
  </div>
</template>

<script>
  import cascaderItems from './cascader-items'

  export default {
    name: 'cascader',
    props: {
      source: {
        type: Array,
      },
      height: {
        type: String
      },
      selected: {
        type: Array,
        default: () => []
      },
      level: {
        type: Number,
        default: 0
      }
    },
    components: {
      cascaderItems
    },
    data () {
      return {
        popoverVisible: false
      }
    },
    methods: {
      updateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./styles/var";
  .cascader {
    position: relative;
    .trigger {
      border: 1px solid black;
      height: 32px;
      width: 100px;
    }
    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      display: flex;
      @extend .box-shadow;
    }
  }
</style>
