const baseBabelPlugin = [
  'transform-runtime',
  'transform-decorators-legacy',
  ['import', [{libraryName: 'antd', style: true}]],
  ['module-resolver', {
    'alias': {
      'components': './src/components',
      'config': './src/config',
      'images': './src/images',
      'models': './src/models',
      'routes': './src/routes',
      'services': './src/services',
      'utils': './src/utils'
    }
  }]
]

export default {
  'entry': 'src/index.js',
  'disableCSSModules': true,
  'hash': true,
  'ignoreMomentLocale': true,
  'autoprefixer': {
    'browsers': [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9'
    ],
    'flexbox': 'no-2009'
  },
  'env': {
    'development': {
      'extraBabelPlugins': baseBabelPlugin.concat('dva-hmr'),

    },
    'production': {
      'publicPath': 'http://p0y3d4gdq.bkt.clouddn.com/new/',
      'extraBabelPlugins': baseBabelPlugin
    }
  }
}
