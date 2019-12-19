<template>
  <div class="my-table-wrapper">
    <table class="my-table" :class="{bordered,compact,striped}">
      <thead>
      <tr>
        <th><input type="checkbox"></th>
        <th v-if="numberVisible">#</th>
        <th v-for="column in columns">
          {{column.text}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in dataSource">
        <td><input type="checkbox" @change="onChangeItem(item,index,$event)"></td>
        <td v-if="numberVisible">{{index+1}}</td>
        <template v-for="column in columns">
          <td>{{item[column.field]}}</td>
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
      dataSource: {
        type: Array,
        required: true
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
      onChangeItem (item, index, e) {
        this.$emit('changeItem', { selected: e.target.checked, item, index })
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
