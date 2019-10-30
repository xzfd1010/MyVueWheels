<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible=!popoverVisible">
      <!--      <slot></slot>-->
      {{result}}
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
    computed: {
      result () {
        return this.selected.map(item => item.name).join('/')
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
    height: $input-height;
    .trigger {
      height: $input-height;
      display: inline-flex;
      align-items: center;
      padding: 0 1em;
      min-width: 10em;
      border: 1px solid $border-color;
      border-radius: $border-radius;
    }
    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      display: flex;
      border-radius: 2px;
      margin-top: 8px;
      @extend .box-shadow;
    }
  }
</style>
