/**
 * Created by out_xu on 17/7/17.
 */
const QiniuPlugin = require('qiniu-webpack-plugin')
module.exports = function (webpackConfig) {
  if (process.env.NODE_ENV === 'production') {
    const qiniu = process.env.ci ? {
      ACCESS_KEY: process.env.ACCESS_KEY || '',
      SECRET_KEY: process.env.SECRET_KEY || '',
      bucket: process.env.qiniu_bucket || '',
      path: process.env.qiniu_path || ''
    } : require('./pushConfig').qiniu
    webpackConfig.plugins.push(new QiniuPlugin(qiniu))
  }
  return webpackConfig
}
