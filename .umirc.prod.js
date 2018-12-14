const QiniuPlugin = require('qiniu-webpack-plugin')

export default {
  hash: true,
  targets: { ie: 10 },
  browserslist: ['> 1%', 'last 2 versions', 'iOS >= 8'],
  publicPath: 'http://ojcdn.acmclub.cn/new/',
  chainWebpack: (config, { webpack }) => {
    config.optimization.delete('splitChunks')
    config.plugin('qiniu').use(QiniuPlugin, [require('./pushConfig').qiniu])
  }
}
