export default {
  namespace: 'utils',
  state: {
    loading: false,
    modal: false
  },
  reducers: {
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    showModal (state) {
      return {
        ...state,
        modal: true
      }
    },
    hideModal (state) {
      return {
        ...state,
        modal: false
      }
    }
  }
}
