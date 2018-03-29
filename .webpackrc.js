const getRelPath = path => __dirname + path

export default {
  'disableCSSModules': true,
  'ignoreMomentLocale': true,
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "iOS >= 8"
  ],
  "extraBabelIncludes": [
    "node_modules/af-webpack/lib",
    "node_modules/umi-build-dev",
    "node_modules/af-webpack/node_modules"
  ],
  "alias": {
    'components': getRelPath('/src/components'),
    'config': getRelPath('/src/config'),
    'images': getRelPath('/src/images'),
    'pages': getRelPath('/src/pages'),
    'utils': getRelPath('/src/utils'),
    'services': getRelPath('/src/services'),
    'layouts': getRelPath('/src/layouts')
  },
  'env': {
    'production': {
      'publicPath': 'http://p0y3d4gdq.bkt.clouddn.com/new/'
    }
  }
}

