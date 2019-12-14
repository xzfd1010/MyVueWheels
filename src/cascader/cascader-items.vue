<template>
  <div :style="{height}" class="child">
    <div class="left">
      <div @click="onClickLabel(item)" class="label" v-for="item in children">
        <span class="name">{{item.name}}</span>
        <span class="icons">
          <template v-if="loadingItem.name === item.name">
            <icon class="loading" name="loading"></icon>
          </template>
          <template v-else>
            <icon name="right" v-if="rightArrowVisible(item)"></icon>
          </template>
        </span>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <!--  自动向下一个层级  -->
      <cascader-items :children="rightItems" :height="height" :level="level+1" :load-data="loadData"
                      :loading-item="loadingItem" :selected="selected"
                      @update:selected="updateSelected"></cascader-items>
    </div>
  </div>
</template>

<script>
  import icon from '../icon'

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
      },
      loadData: {
        type: Function
      },
      loadingItem: {
        type: Object,
        default: () => ({})
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
        if (this.selected[this.level]) {
          let selected = this.children.filter((item) => item.name === this.selected[this.level].name)
          if (selected && selected[0].children && selected[0].children.length > 0) {
            return selected[0].children
          }
        }
      },
    },
    methods: {
      rightArrowVisible (item) {
        return this.loadData ? !item.isLeaf : item.children
      },
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

<style lang="scss" scoped>
  @import "../../styles/var";
  @keyframes spin {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .child {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100px;
    .left {
      height: 100%;
      padding: 0.3em 0;
      overflow: auto;
      .label {
        padding: 0.3em 1em;
        display: flex;
        align-items: center;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          background: $grey;
        }
      }
      .name {
        margin-right: 0.5em;
      }
      .icons {
        margin-left: auto;
        transform: scale(0.8);
        fill: #606266;
      }
      .loading {
        animation: spin 1.5s infinite linear;
      }
    }
    .right {
      height: 100%;
      border-left: 1px solid $border-color-light;
    }
  }
</style>
