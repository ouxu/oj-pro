import siderConfig from 'config/sider'
export default {
  namespace: 'root',
  state: {
    layout: {
      nobg: [],
      collapsed: true,
      sider: siderConfig
    }
  },
  subscriptions: {},
  effects: {
    * onCollapse ({payload: {type, collapsed}}, {put}) {
      yield put({type: 'updateLayout', payload: {collapsed}})
    }
  },
  reducers: {
    updateLayout (state, {payload}) {
      const layout = {
        ...state.layout,
        ...payload
      }
      return {
        ...state,
        layout
      }
    }
  }
}
