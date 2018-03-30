export default {
  plugins: [
    'umi-plugin-dva',
    ['umi-plugin-routes', {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//
        ],
    }],
    ['umi-plugin-dll', {
      exclude: ["@babel/runtime"],
      include: ["dva/router", "dva/saga", "react", "react-dom", "axios", "antd/es"]
    }],
  ],
  disableServiceWorker: true,
  loading: './src/components/plugins/Loading'
}
