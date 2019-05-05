import { baseModel } from 'utils/modelExtend'
import modelExtend from 'dva-model-extend'
import { getContest, joinContest } from './service'
import codeHelper from 'utils/codeHelper'

const initError = {
  error: false,
  errorMsg: '',
  errorCode: ''
}
export default modelExtend(baseModel, {
  namespace: 'contest',
  state: {
    contest_info: {},
    problem_info: [],
    ...initError
  },
  effects: {
    * init ({ payload }, { put, call, select }) {
      try {
        const id = payload || ''
        const data = yield call(getContest, payload)
        const { problem_info: problemInfo = [] } = data
        data.problem_info = problemInfo.map(e => ({
          ...e,
          id: e.pid,
          url: '/contests/' + id + '/p/' + e.pnum
        }))
        data.problem_info = yield put({
          type: 'update',
          payload: {
            ...data,
            ...initError
          }
        })
      } catch (e) {
        yield put({
          type: 'update',
          payload: {
            error: true,
            errorCode: e.message,
            errorMsg: codeHelper(e.message)
          }
        })
      }
    },
    * joinContest ({ payload }, { put, call }) {
      const { id, data } = payload
      yield call(joinContest, id, data)
    }
  },
  reducers: {}
})
