export default {
  namespace: 'admin',
  state: {
    a: 1
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname }) => {
        console.log(pathname)
      })
    }
  },
  effects: {},
  reducers: {}
}
