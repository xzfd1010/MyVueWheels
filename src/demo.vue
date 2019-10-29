<template>
  <cascader :source="source">
    <my-input></my-input>
  </cascader>
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

<style scoped lang="scss">

</style>
