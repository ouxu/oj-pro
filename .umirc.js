const getRelPath = path => __dirname + path
const QiniuPlugin = require('qiniu-webpack-plugin')

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true,
        antd: true,
        routes: {
          exclude: [/model\.(j|t)sx?$/, /service\.(j|t)sx?$/, /models\//, /components\//, /services\//]
        },
        dll: {
          exclude: ['@babel/runtime'],
          include: ['dva/router', 'dva/saga', 'react', 'react-dom', 'axios', 'antd/es']
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: '/components/plugins/Loading'
        }
      }
    ]
  ],
  disableCSSModules: true,
  ignoreMomentLocale: true,
  browserslist: ['> 1%', 'last 2 versions', 'iOS >= 8'],
  targets: { ie: 10 },
  alias: {
    components: getRelPath('/src/components'),
    config: getRelPath('/src/config'),
    images: getRelPath('/src/images'),
    pages: getRelPath('/src/pages'),
    utils: getRelPath('/src/utils'),
    services: getRelPath('/src/services'),
    layouts: getRelPath('/src/layouts')
  },
  env: {
    production: {
      publicPath: 'http://p0y3d4gdq.bkt.clouddn.com/new/'
    },
    chainWebpack (config, { webpack }) {
      config.plugin('qiniu').use(QiniuPlugin, require('./pushConfig').qiniu)
    }
  }
}
