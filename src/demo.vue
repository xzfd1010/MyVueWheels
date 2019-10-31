<template>
  <div style="padding: 100px;">
    <div>
      <cascader :source.sync="source" :selected.sync="selected" height="200px" :load-data="loadData"></cascader><br>
    </div>
    <div>
      <cascader :source.sync="source" :selected.sync="selected" height="200px" :load-data="loadData"></cascader>
    </div>
  </div>
</template>

<script>
  import Cascader from './cascader'
  import Input from './input'
  import db from './assets/db'
  import { removeListener } from './click-outside'

  const tempDb = db.map(node => {
    node.isLeaf = db.filter(item => item.parent_id === node.id).length <= 0
    return node
  })

  function ajax (parent_id = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        let result = tempDb.filter(item => item.parent_id === parent_id)
        resolve(result)
      },2000)
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
        source: [
          // {
          //   name: '浙江',
          //   children: [{
          //     name: '杭州',
          //     children: [{
          //       name: '萧山'
          //     }]
          //   },
          //     { name: '湖州', },
          //     { name: '嘉兴' }
          //   ]
          // },
          // {
          //   name: '山东',
          //   children: [{
          //     name: '烟台',
          //     children: [
          //       { name: '龙口' }
          //     ]
          //   },
          //     { name: '济南' }
          //   ]
          // }
        ]
      }
    },
    methods: {
      loadData (parent_id, callback) {
        ajax(parent_id).then(result => {
          callback(result)
        })
      }
    },
    destroyed () {
      removeListener()
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
