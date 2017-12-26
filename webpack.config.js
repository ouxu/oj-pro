/**
 * Created by out_xu on 17/7/17.
 */
const webpack = require('webpack')
const QiniuPlugin = require('qiniu-webpack-plugin')
module.exports = function (webpackConfig, env) {
  if (env === 'production') {
    const qiniu = process.env.ci ? {
      ACCESS_KEY: process.env.ACCESS_KEY,
      SECRET_KEY: process.env.SECRET_KEY,
      bucket: process.env.bucket,
      path: process.env.path
    } : require('./pushConfig').qiniu
    webpackConfig.plugins.push(new QiniuPlugin(qiniu))
  }
  return webpackConfig
}
