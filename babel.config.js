// 这是项目发布阶段需要用到的babel 插件
let prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  // 发布产品时去掉所有的console
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  'presets': [
    '@vue/cli-plugin-babel/preset'
  ],
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ],
    // 发布产生时候的数组
    ...prodPlugins,
    // 路由懒加载
    '@babel/plugin-syntax-dynamic-import'
  ]
}
