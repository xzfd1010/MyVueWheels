<template>
  <div style="padding: 100px;">
    <cascader :source.sync="source" :selected.sync="selected" height="200px" :load-data="loadData"></cascader>
  </div>
</template>

<script>
  import Cascader from './cascader'
  import Input from './input'
  import db from './assets/db'

  function ajax (parent_id = 0) {
    return new Promise((resolve, reject) => {
      let result = db.filter(item => item.parent_id === parent_id)
      resolve(result)
    })
  }

  export default {
    name: 'demo',
    components: {
      Cascader,
      'my-input': Input
    },
    data () {
      return {
        selected: [],
        source: []
      }
    },
    methods: {
      loadData (parent_id, callback) {
        ajax(parent_id).then(result => {
          console.log('result', result)
          callback(result)
        })
      }
    },
    mounted () {
      ajax(0).then((result) => {
        this.source = result
      })
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    /*margin: 20px;*/
  }

  :root {
    --font-size: 14px;
  }

  body {
    font-size: var(--font-size);
  }
</style>
