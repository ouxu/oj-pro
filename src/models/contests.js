import { baseModel } from 'utils/modelExtend'
import modelExtend from 'dva-model-extend'
import { getContests, searchContests } from 'services/contests'

export default modelExtend(baseModel, {
  namespace: 'contests',
  state: {
    contestsList: {
      data: [],
      count: 0,
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
      // eslint-disable-next-line
      const {contests, total_count} = keyword ? yield call(searchContests, query) : yield call(getContests, query)
      const contestsList = {
        data: contests,
        count: total_count,
        keyword
      }
      yield put({type: 'update', payload: {contestsList}})
    }
  },
  reducers: {}
})
