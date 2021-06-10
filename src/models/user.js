import { check, login } from 'services/user'
import sleep from 'utils/sleep'
import message from 'utils/message'

const userState = {
  role: '',
  token: '',
  user: {},
  lastCheck: '',
  interval: 600000,
  ...JSON.parse(window.localStorage.getItem('NEUQ-OJ'))
}
export default {
  namespace: 'user',
  state: userState,
  subscriptions: {
    userSubscriber ({dispatch, history}) {
      return history.listen(() => {
        dispatch({type: 'check'})
          .catch(e => dispatch({type: 'logout'}))
      })
    }
  },
  effects: {
    * check ({payload}, {select, call, put}) {
      const user = yield select(({user}) => user)
      const {token, lastCheck, interval} = user
      const now = (new Date()).getTime()

      window._userInfo_ = user

      if (token && (!lastCheck || (now - lastCheck) > interval)) {
        yield call(check)
        let data = {
          ...user,
          lastCheck: (new Date()).getTime()
        }
        yield put({type: 'update', payload: data})
      }
    },
    * login ({payload}, {put, call}) {
      try {
        const {values} = payload
        yield put({type: 'utils/showLoading'})
        yield call(sleep, 1500)
        let data = yield call(login, values)
        data = {
          ...data,
          lastCheck: (new Date()).getTime()
        }
        yield put({type: 'utils/hideModal'})
        yield put({type: 'update', payload: data})
        message.success('登录成功')
      } catch (e) {
        throw e
      } finally {
        yield put({type: 'utils/hideLoading'})
      }
    },
    * logout ({payload}, {put}) {
      const user = {
        role: 'student',
        token: '',
        user: {},
        lastCheck: ''
      }
      yield put({
        type: 'update',
        payload: user
      })
    }
  },
  reducers: {
    update (state, {payload}) {
      const user = {
        ...state,
        ...payload
      }
      localStorage.setItem('NEUQ-OJ', JSON.stringify(user))
      return user
    }
  }
}
