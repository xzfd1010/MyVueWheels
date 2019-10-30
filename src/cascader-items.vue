<template>
  <div class="child" :style="{height}">
    <div class="left">
      <div class="label" v-for="item in children" @click="onClickLabel(item)">
        {{item.name}}
        <icon name="right" v-if="item.children" class="icon"></icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <!--  自动向下一个层级  -->
      <cascader-items :children="rightItems" :height="height" :selected="selected" :level="level+1"
                      @update:selected="updateSelected"></cascader-items>
    </div>
  </div>
</template>

<script>
  import icon from './icon'

  export default {
    name: 'cascaderItems',
    props: {
      children: {
        type: Array
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
      icon
    },
    data () {
      return {
        leftSelected: null
      }
    },
    computed: {
      rightItems () {
        let currentSelected = this.selected[this.level]
        if (currentSelected && currentSelected.children) {
          return currentSelected.children
        } else {
          return null
        }
      }
    },
    methods: {
      onClickLabel (item) {
        // 点击之后，先获得深拷贝的selected，修改对应level的值，删除之后level的值
        let copySelected = JSON.parse(JSON.stringify(this.selected))
        copySelected[this.level] = item
        copySelected.splice(this.level + 1)
        this.$emit('update:selected', copySelected)
      },
      updateSelected (newSelected) {
        this.$emit('update:selected', newSelected) // 不断将递归组件的值向外传递
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "styles/var";
  .child {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100px;
    .left {
      height: 100%;
      padding: 0.3em 0;
      .label {
        padding: 0.3em 1em;
        display: flex;
        align-items: center;
      }
      .icon {
        transform: scale(0.8);
        margin-left: 0.5em;
        fill: #606266;
      }
    }
    .right {
      height: 100%;
      border-left: 1px solid $border-color-light;
    }
  }
</style>
