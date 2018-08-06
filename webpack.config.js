/**
 * Created by out_xu on 17/7/17.
 */
const QiniuPlugin = require('qiniu-webpack-plugin')
module.exports = function (webpackConfig) {
  if (process.env.NODE_ENV === 'production') {
    const qiniu = require('./pushConfig').qiniu
    webpackConfig.plugins.push(new QiniuPlugin(qiniu))
  }
  return webpackConfig
}
