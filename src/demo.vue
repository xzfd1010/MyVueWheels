<template>
  <div style="padding: 100px;">
    <cascader :source="source" height="200px"></cascader>
  </div>
</template>

<script>
  import Cascader from './cascader'
  import Input from './input'

  export default {
    name: 'demo',
    components: {
      Cascader,
      'my-input': Input
    },
    data () {
      return {
        source: [
          {
            name: '浙江',
            children: [{
              name: '杭州',
              children: [{
                name: '萧山'
              }]
            },
              { name: '湖州', },
              { name: '嘉兴' }
            ]
          }, {
            name: '山东',
            children: [{
              name: '烟台',
              children: [
                { name: '龙口' }
              ]
            },
              { name: '济南' }
            ]
          }]
      }
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
