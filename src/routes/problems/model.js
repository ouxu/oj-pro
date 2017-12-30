import { baseModel, inputModel, loadingModel } from 'utils/modelExtend'
import modelExtend from 'dva-model-extend'
import { getProblems, getRecording, searchProblems } from './service'

export default modelExtend(baseModel, loadingModel, inputModel, {
  namespace: 'problems',
  state: {
    problemsList: {
      data: [],
      page: 1,
      size: 50,
      keyword: '',
      count: 10000
    },
    selectProblem: {},
    statusList: [],
    scrollFlag: false
  },
  effects: {
    * init ({payload}, {put, select}) {
      yield put({type: 'getProblems', payload})
      yield put({type: 'getRecording', payload})
    },
    * getProblems ({payload}, {put, call}) {
      const {page = 1, size = 50, keyword} = payload
      const query = {
        page,
        size,
        keyword
      }
      try {
        const {problems, total_count} = keyword ? yield call(searchProblems, query) : yield call(getProblems, query)
        const problemsList = {
          data: problems,
          count: total_count,
          keyword,
          page,
          size
        }
        yield put({type: 'update', payload: {problemsList}})
      } catch (e) {
        throw e
      }
    },
    * getRecording ({payload}, {put, call, select}) {
      const {token} = yield select(({user}) => user)
      if (token) {
        const statusList = yield call(getRecording)
        yield put({type: 'update', payload: {statusList: statusList.slice(0, 10)}})
      }
    }
  },
  reducers: {}
})
