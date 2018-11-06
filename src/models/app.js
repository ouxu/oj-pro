import siderConfig from 'config/sider'
import router from 'umi/router'

const enQuery = [
  '/problems',
  '/contests',
  '/admin/contest-list',
  '/admin/problem-list'
]

export default {
  namespace: 'root',
  state: {
    layout: {
      nobg: [],
      collapsed: true,
      sider: siderConfig
    },
    query: {}
  },
  subscriptions: {
    querySubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (enQuery.includes(pathname)) {
          dispatch({type: 'handleQueries', payload: {pathname, query}})
        }
      })
    }
  },
  effects: {
    * onCollapse ({payload: {type, collapsed}}, {put}) {
      yield put({type: 'updateLayout', payload: {collapsed}})
    },
    * handleQueries ({payload}, {put, select}) {
      const {pathname, query} = payload
      if (JSON.stringify(query) !== '{}') {
        yield put({type: 'updateQueries', payload})
      } else {
        const {query: savedQuery} = yield select(({root}) => root)
        if (savedQuery[pathname]) {
          router.replace({
            pathname,
            query: savedQuery[pathname]
          })
        }
      }
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
    },
    updateQueries (state, {payload}) {
      const {pathname, query} = payload
      return {
        ...state,
        query: {
          ...state.query,
          [pathname]: query
        }
      }
    }
  }
}
