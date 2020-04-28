<template>
  <div class="n-table-wrapper" ref="wrapper">
    <div :style="{height,overflow:'auto'}" ref="tableWrapper">
      <table class="n-table" :class="{bordered,compact,striped}" ref="table">
        <thead>
        <tr>
          <th v-if="expandField" :style="{width:'50px'}" class="n-table-center"></th>
          <th v-if="checkable" style="width:50px;"><input type="checkbox" @change="onChangeAllItems" ref="allChecked"
                                                          :checked="areAllItemsSelected"></th>
          <th style="width:50px;" v-if="numberVisible">#</th>
          <th v-for="column in columns" :key="column.field" :style="{width:`${column.width}px`}">
            <div class="n-table-header">
              {{column.text}}
              <span class="n-table-sorter" v-if="column.field in orderBy" @click="changeOrderBy(column.field)">
              <icon name="ascend" :class="{active: orderBy[column.field] === 'asc'}"></icon>
              <icon name="descend" :class="{active: orderBy[column.field] === 'desc'}"></icon>
            </span>
            </div>
          </th>
          <th v-if="$scopedSlots.default" ref="actionsHeader"></th>
          <th style="width:15px;padding: 0;"></th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item,index) in dataSource">
          <tr :key="item.id">
            <td v-if="expandField" :style="{width:'50px'}" class="n-table-center">
              <icon class="n-table-expandIcon" name="right"
                    :class="{down:inExpandedIds(item.id)}"
                    @click="expandItem(item.id)"></icon>
            </td>
            <td v-if="checkable" style="width:50px;">
              <input type="checkbox" @change="onChangeItem(item,index,$event)"
                     :checked="inSelectedItems(item)"></td>
            <td style="width:50px;" v-if="numberVisible">{{index+1}}</td>
            <template v-for="column in columns">
              <td :style="{width:`${column.width}px`}" :key="column.field">
                <template v-if="column.render">
                  <vnodes :vnodes="column.render({value:item[column.field]})"></vnodes>
                </template>
                <template v-else>
                  {{item[column.field]}}
                </template>
              </td>
            </template>
            <td v-if="$scopedSlots.default">
              <div ref="actions" style="display: inline-block;">
                <slot :item="item"></slot>
              </div>
            </td>
          </tr>
          <tr v-if="inExpandedIds(item.id)" :key="`${item.id}-expand`">
            <td :colspan="columns.length + expandedCellColSpan">{{item[expandField] || ' '}}</td>
          </tr>
        </template>
        
        </tbody>
      </table>
    </div>
    <div class="n-table-loading" v-if="loading">
      <icon name="loading"></icon>
    </div>
  </div>
</template>

<script>
import Icon from '../icon'

export default {
  name: 'GTable',
  components: {
    Icon,
    vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  props: {
    expandField: {
      type: String,
    },
    orderBy: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      required: true,
      validator (array) {
        // 数据必须传id
        return !(array.filter(item => item.id === undefined).length > 0)
      }
    },
    numberVisible: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: true
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expandedIds: [],
      columns: []
    }
  },
  methods: {
    inExpandedIds (id) {
      return this.expandedIds.indexOf(id) >= 0
    },
    expandItem (id) {
      if (this.inExpandedIds(id)) {
        this.expandedIds.splice(this.expandedIds.indexOf(id), 1)
      } else {
        this.expandedIds.push(id)
      }
    },
    changeOrderBy (key) {
      // 排序应该让后端做？？我感觉还是可以让前端排序吧
      const copy = JSON.parse(JSON.stringify(this.orderBy))
      let oldValue = copy[key]
      if (oldValue === 'asc') {
        copy[key] = 'desc'
      } else if (oldValue === 'desc') {
        copy[key] = true
      } else {
        copy[key] = 'asc'
      }
      this.$emit('update:orderBy', copy)
    },
    inSelectedItems (item) {
      return this.selectedItems.filter(i => item.id === i.id).length > 0
    },
    onChangeItem (item, index, e) {
      let selected = e.target.checked
      let copy = JSON.parse(JSON.stringify(this.selectedItems))
      if (selected) {
        copy.push(item)
      } else {
        // 深拷贝之后要通过id来搜索
        copy = copy.filter(i => i.id !== item.id)
      }
      this.$emit('update:selectedItems', copy)
    },
    onChangeAllItems (e) {
      let selected = e.target.checked
      this.$emit('update:selectedItems', selected ? this.dataSource : [])
    },
  },
  mounted () {
    console.log(this.$slots.default)
    this.columns = this.$slots.default.map(node => {
      let { text, field, width } = node.componentOptions.propsData
      let render = node.data.scopedSlots && node.data.scopedSlots.default
      return { text, field, width, render }
    })
    console.log(this.columns)

    let table2 = this.$refs.table.cloneNode(false)
    this.table2 = table2
    table2.classList.add('n-table-copy')
    let tHead = this.$refs.table.children[0]
    let { height } = tHead.getBoundingClientRect()
    this.$refs.tableWrapper.style.marginTop = height + 'px'
    this.$refs.tableWrapper.style.height = this.height - height + 'px'
    table2.appendChild(tHead)
    this.$refs.wrapper.appendChild(table2)

    if (this.$scopedSlots.default) {
      let div = this.$refs.actions[0]
      let { width } = div.getBoundingClientRect()
      let parent = div.parentElement
      let paddingLeft = getComputedStyle(parent).getPropertyValue('padding-left')
      let paddingRight = getComputedStyle(parent).getPropertyValue('padding-right')
      let borderLeft = getComputedStyle(parent).getPropertyValue('border-left-width')
      let borderRight = getComputedStyle(parent).getPropertyValue('border-right-width')
      let width2 = width + parseInt(paddingLeft) + parseInt(paddingRight) + parseInt(borderLeft) + parseInt(borderRight) + 'px'
      this.$refs.actionsHeader.style.width = width2 // 我这里还有问题
      this.$refs.actions.map(div => {
        div.parentNode.style.width = width2
      })
      console.log(paddingLeft, paddingRight, borderLeft, borderRight)
      console.log(width)
    }
    // this.updateHeaderWidth()
    // this.onWindowResize = () => this.updateHeaderWidth()
    // window.addEventListener('resize', this.onWindowResize)
  },
  beforeDestroy () {
    this.table2.remove()
    // window.removeEventListener('resize', this.onWindowResize)
  },
  computed: {
    expandedCellColSpan () {
      let result = 0
      if (this.checkable) {result += 1}
      if (this.expandField) {result += 1}
      return result
    },
    areAllItemsSelected () {
      // 判断两个数组所有元素的id是否都相同
      const a = this.dataSource.map(item => item.id).sort() // 字典序排序即可
      const b = this.selectedItems.map(item => item.id).sort()
      let equal = true
      if (a.length !== b.length) {
        equal = false
      } else {
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            equal = false
            break
          }
        }
      }
      return equal
      // return this.selectedItems.length === this.dataSource.length
    }
  },
  watch: {
    selectedItems () {
      this.$refs.allChecked.indeterminate = this.selectedItems.length > 0 && this.selectedItems.length < this.dataSource.length
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/var";
  $grey: darken($grey, 10%);
  .n-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;
    &-wrapper {
      position: relative;
      overflow: auto;
    }
    &.bordered {
      border: 1px solid $grey;
      td, th {
        border: 1px solid $grey;
      }
    }
    &.compact {
      th, td {
        padding: 4px;
      }
    }
    th, td {
      text-align: left;
      padding: 8px;
      border-bottom: 1px solid $grey;
    }
    th {
      font-weight: 700;
    }
    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background: white;
          }
          &:nth-child(even) {
            background: #fafafa;
          }
        }
      }
    }
    &-sorter {
      display: inline-flex;
      flex-direction: column;
      margin: 0 4px;
      fill: $grey;
      svg {
        width: 10px;
        height: 10px;
        cursor: pointer;
        &:first-child {
          position: relative;
          bottom: -1px;
        }
        &:last-child {
          top: -1px;
        }
        &.active {
          fill: red;
        }
      }
    }
    &-header {
      display: flex;
      align-items: center;
    }
    // 这个外面并没有再套一层 .n-table 好奇怪
    &-loading {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      svg {
        width: 50px;
        height: 50px;
        @include spin;
      }
    }
    &-copy {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
    }
    &-expandIcon {
      width: 10px;
      height: 10px;
      transition: transform 300ms;
      &.down {
        transform: rotate(90deg);
      }
    }
    & &-center {
      text-align: center;
    }
  }

</style>
