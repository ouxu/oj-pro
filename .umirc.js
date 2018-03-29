export default {
  plugins: [
    'umi-plugin-dva',
    ['umi-plugin-dll', {
      exclude: ["@babel/runtime"],
      include: ["dva/router", "dva/saga", "react", "react-dom", "axios"],
    }],
  ],
  disableServiceWorker: true,
  loading: './src/components/plugins/Loading'
}
