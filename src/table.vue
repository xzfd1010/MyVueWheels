<template>
  <div class="my-table-wrapper">
    <table class="my-table" :class="{bordered,compact,striped}">
      <thead>
      <tr>
        <th><input type="checkbox" @change="onChangeAllItems" ref="allChecked"
                   :checked="selectedItems.length === dataSource.length"></th>
        <th v-if="numberVisible">#</th>
        <th v-for="column in columns" :key="column.field">
          {{column.text}}
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
  </div>
</template>

<script>
  export default {
    name: 'GTable',
    props: {
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
    watch: {
      selectedItems () {
        this.$refs.allChecked.indeterminate = this.selectedItems.length > 0 && this.selectedItems.length < this.dataSource.length;
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
  }
</style>
