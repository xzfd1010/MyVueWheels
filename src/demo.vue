<template>
  <div>
    <div style="margin:20px;">
      <g-table :columns="columns" :data-source="dataSource" @changeItem="x"></g-table>
    </div>
    <div style="margin:20px;">
      <g-table :columns="columns" :data-source="dataSource" bordered compact :striped="false"></g-table>
    </div>
    <div style="margin: 20px;">
      <pager :total-page="1" :current-page.sync="currentPage" :hide-if-one-page="false"
             @update:currentPage="handlePageChange"></pager>
    </div>
  </div>


</template>

<script>
  import Pager from '@/pager'
  import GTable from '@/./table'

  export default {
    name: 'demo',
    components: {
      Pager,
      GTable
    },
    data () {
      return {
        currentPage: 1,
        columns: [
          { text: '姓名', field: 'name' },
          { text: '分数', field: 'score' }
        ],
        dataSource: [
          { id: 1, name: 'nick', score: 100 },
          { id: 2, name: 'tom', score: 99 },
          { id: 1, name: 'mary', score: 100 },
          { id: 2, name: 'lily', score: 99 },
          { id: 1, name: 'lorry', score: 100 },
          { id: 2, name: 'tony', score: 99 }
        ]
      }
    },
    methods: {
      x (object) {
        let { selected, item, index } = object
        if (selected) {
          this.selected.push(item)
        } else {
          let index = this.selected.indexOf(item)
          this.selected.splice(index, 1)
        }
      },
      handlePageChange (n) {
        console.log(n)
      }
    }

  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
