/**
 * Created by out_xu on 17/7/17.
 */
const webpack = require('webpack')
const QiniuPlugin = require('qiniu-webpack-plugin')
const pushConfig = require('./pushConfig')
module.exports = function (webpackConfig, env) {
  if (env === 'production') {
    webpackConfig.plugins.push(new QiniuPlugin(pushConfig.qiniu))
  }
  return webpackConfig
}
