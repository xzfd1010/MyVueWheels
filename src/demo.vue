<template>
  <cascader :source="source"></cascader>
</template>

<script>
  import Cascader from './cascader'

  export default {
    name: 'demo',
    components: {
      'cascader': Cascader
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
