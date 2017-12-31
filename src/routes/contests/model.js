import { baseModel, inputModel, loadingModel } from 'utils/modelExtend'
import modelExtend from 'dva-model-extend'
import { getContests, searchContests } from './service'

export default modelExtend(baseModel, loadingModel, inputModel, {
  namespace: 'contests',
  state: {
    contestsList: {
      data: [],
      page: 1,
      size: 20,
      count: 10000,
      keyword: ''
    },
    selectContest: {}
  },
  effects: {
    * init ({payload}, {put, call}) {
      const {page = 1, size = 20, keyword} = payload
      const query = {
        page,
        size,
        keyword
      }
      const {contests, total_count} = keyword ? yield call(searchContests, query) : yield call(getContests, query)
      const contestsList = {
        data: contests,
        count: total_count,
        keyword,
        page,
        size
      }
      yield put({type: 'update', payload: {contestsList}})
    }
  },
  reducers: {}
})
