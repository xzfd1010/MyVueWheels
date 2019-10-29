<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible=!popoverVisible">
      <slot></slot>
    </div>
    <div class="popover" v-if="popoverVisible">
      <cascader-items :children="source" :height="height"></cascader-items>
    </div>
  </div>
</template>

<script>
  import cascaderItems from './cascader-items'

  export default {
    name: 'cascader',
    props: {
      source: {
        default: Array,
      },
      height: {
        type: String
      }
    },
    components: {
      cascaderItems
    },
    data () {
      return {
        popoverVisible: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./styles/var";
  .cascader {
    position: relative;
    .trigger {
      border: 1px solid #dcdfe6;
      height: 32px;
      width: 100px;
    }
    .popover {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      display: flex;
      @extend .box-shadow;
      .label {
        white-space: nowrap;
      }
    }
  }
</style>
