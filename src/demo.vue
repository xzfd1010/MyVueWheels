<template>
  <div style="margin: 20px;">
    <pager :total-page="20" :current-page="3"></pager>
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
        selected: 'home'
      }
    },
    watch: {
      selected (newValue) {
        if (newValue === 'hire') {
          alert('hi')
        }
      }
    },
    mounted () {
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
