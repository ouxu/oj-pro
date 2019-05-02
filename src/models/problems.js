import { baseModel, inputModel, loadingModel } from 'utils/modelExtend'
import modelExtend from 'dva-model-extend'
import { getProblems, getRecording, searchProblems } from 'services/problems'

export default modelExtend(baseModel, loadingModel, inputModel, {
  namespace: 'problems',
  state: {
    problemsList: {
      data: [],
      count: 0
    },
    selectProblem: {},
    statusList: [],
    scrollFlag: false
  },
  effects: {
    * init ({ payload }, { put, select }) {
      yield put({ type: 'getProblems', payload })
      yield put({ type: 'getRecording', payload })
    },
    * getProblems ({ payload }, { put, call }) {
      const { page = 1, size = 30, keyword } = payload
      const query = {
        page,
        size,
        keyword
      }
      try {
        // eslint-disable-next-line
        const { problems, total_count } = keyword ? yield call(searchProblems, query) : yield call(getProblems, query)
        const problemsList = {
          data: problems,
          count: total_count // eslint-disable-line
        }
        yield put({ type: 'update', payload: { problemsList } })
      } catch (e) {
        throw e
      }
    },
    * getRecording ({ payload }, { put, call, select }) {
      const {
        token,
        user: { id }
      } = yield select(({ user }) => user)
      if (token) {
        const statusList = yield call(getRecording, { user_id: id })
        yield put({ type: 'update', payload: { statusList: statusList.slice(0, 10) } })
      }
    }
  },
  reducers: {}
})
