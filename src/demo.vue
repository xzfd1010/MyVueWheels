<template>
  <div style="margin: 20px;">
    <pager :total-page="1" :current-page.sync="currentPage" :hide-if-one-page="false"
           @update:currentPage="handlePageChange"></pager>
  </div>

</template>

<script>
  import Pager from '@/pager'

  export default {
    name: 'demo',
    components: {
      Pager
    },
    data () {
      return {
        selected: 'home',
        currentPage: 1
      }
    },
    methods: {
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
