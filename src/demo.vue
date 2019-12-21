<template>
  <div>
    {{selected}}
    <div style="margin:20px;">
      <g-table :columns="columns" :data-source="dataSource" :selected-items.sync="selected"
               :order-by.sync="orderBy" :loading="loading" @update:orderBy="x"></g-table>
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
        loading: false,
        currentPage: 1,
        columns: [
          { text: '姓名', field: 'name' },
          { text: '分数', field: 'score' }
        ],
        orderBy: { // true - 开启排序，不确定是 asc、desc
          name: true,
          score: 'desc'
        },
        dataSource: [
          { id: 1, name: 'nick', score: 100 },
          { id: 2, name: 'tom', score: 99 },
          { id: 3, name: 'mary', score: 100 },
          { id: 4, name: 'lily', score: 99 },
          { id: 5, name: 'lorry', score: 100 },
          { id: 6, name: 'tony', score: 99 }
        ],
        selected: []
      }
    },
    methods: {
      x () {
        console.log('x')
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 3000)
        this.dataSource = this.dataSource.sort((a, b) => a.score - b.score)
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
