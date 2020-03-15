const path = require('path')

module.exports = {
  base: '/nick-vue-wheels/',
  title: 'Nick的轮子',
  description: '一个好用的UI框架',
  themeConfig: {
    nav: [],
    sidebar: [
      {
        title: '入门',
        children: [
          '/install/',
          '/get-started/',
        ],
        collapsable: false,
      },
      {
        title: '组件',
        children: [
          '/components/Button',
          '/components/input',
          '/components/grid',
          '/components/layout',
          '/components/tabs',
          '/components/toast',
          '/components/popover'
        ],
        collapsable: false,
      }
    ]
  },
  scss: {
    sassOptions:{
      includePaths: [path.join(__dirname, '../../styles')]
    }
  }
}
