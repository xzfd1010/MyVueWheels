<template>
  <div class="my-table-wrapper">
    <table class="my-table" :class="{bordered,compact,striped}">
      <thead>
      <tr>
        <th><input type="checkbox" @change="onChangeAllItems" ref="allChecked"
                   :checked="areAllItemsSelected"></th>
        <th v-if="numberVisible">#</th>
        <th v-for="column in columns" :key="column.field">
          <div class="my-table-header">
            {{column.text}}
            <span class="my-table-sorter" v-if="column.field in orderBy" @click="changeOrderBy(column.field)">
              <icon name="ascend" :class="{active: orderBy[column.field] === 'asc'}"></icon>
              <icon name="descend" :class="{active: orderBy[column.field] === 'desc'}"></icon>
            </span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in dataSource" :key="item.id">
        <td>
          <input type="checkbox" @change="onChangeItem(item,index,$event)"
                 :checked="inSelectedItems(item)"></td>
        <td v-if="numberVisible">{{index+1}}</td>
        <template v-for="column in columns">
          <td :key="column.field">{{item[column.field]}}</td>
        </template>
      </tr>
      </tbody>
    </table>
    <div class="my-table-loading" v-if="loading">
      <icon name="loading"></icon>
    </div>
  </div>
</template>

<script>
  import Icon from './icon'

  export default {
    name: 'GTable',
    components: { Icon },
    props: {
      orderBy: {
        type: Object,
        default: () => ({})
      },
      loading: {
        type: Boolean,
        default: false
      },
      columns: {
        type: Array,
        required: true,
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
      }
    },
    methods: {
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
      }
    },
    computed: {
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
  .my-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;
    &-wrapper {
      position: relative;
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
    // 这个外面并没有再套一层 .my-table 好奇怪
    &-loading {
      position: absolute;
      top: 0;
      left: 0;
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
  }

</style>
