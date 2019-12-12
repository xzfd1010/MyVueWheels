module.exports = {
  base: '/nick-vue-wheels/',
  title: 'Nick的轮子',
  description: '一个好用的UI框架',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/guide/' }
    ],
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
          '/components/tabs',
          '/components/input',
          '/components/grid',
          '/components/layout',
          '/components/toast',
          '/components/popover'
        ],
        collapsable: false,
      }
    ]
  }
}
