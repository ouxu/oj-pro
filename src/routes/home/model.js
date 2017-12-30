import modelExtend from 'dva-model-extend'
import { baseModel, loadingModel } from 'utils/modelExtend'
import { getHomeNews, getHotProblems } from './service'
import sleep from 'utils/sleep'
import { randomNumBoth } from 'utils/numberAbout'

const dataItem = (time = '') => {
  const flag = Math.floor(Math.random() * ( 1000 + 1))
  return {
    time,
    submit: randomNumBoth(flag, 1000),
    accept: randomNumBoth(0, flag)
  }
}

const dateNow = +Date.now()
let charDate = (new Array(15).fill(0)).map((item, index) => dataItem(`${new Date(dateNow - 86400000 * index).getMonth() + 1}/${new Date(dateNow - 86400000 * index).getDate()}`)).reverse()

export default modelExtend(baseModel, loadingModel, {
  namespace: 'home',
  state: {
    hotProblems: {
      data: [],
      count: 10000
    },
    news: {
      latestNews: [],
      fixedNews: []
    },
    chartDate: charDate
  },
  subscriptions: {},
  effects: {
    * init ({}, {put, select}) {
      const homeDate = yield select(({home}) => home)
      const {lastCheck, token} = yield select(({user}) => user)
      const now = (new Date()).getTime()
      const {hotProblems, news} = homeDate
      if ((!!token && !lastCheck) || hotProblems.data.length === 0 || (now - lastCheck) < 10000) {
        yield put({type: 'getHotProblems'})
      }
      if (news.latestNews.length < 1 && news.fixedNews.length < 1) {
        yield put({type: 'getHomeNews'})
      }
    },
    * getHotProblems ({payload = {}}, {put, call, select}) {
      const {data = [], page = 1, size = 20, count = 10000} = payload
      if ((page - 1) * size > count) {
        return
      } else {
        const query = {
          page,
          size,
          keyword: 'A+B'
        }
        try {
          const {problems, total_count} = yield call(getHotProblems, query)
          const hotProblems = {
            data: [
              ...data,
              ...problems
            ],
            count: total_count,
            page,
            size
          }
          yield call(sleep, 1500)
          yield put({type: 'update', payload: {hotProblems}})
        } catch (e) {
          throw e
        }
      }
    },
    * getHomeNews ({}, {put, call, select}) {
      const {fixed_news: fixNews, latest_news: latestNews} = yield call(getHomeNews)
      const news = {fixNews, latestNews}
      yield put({type: 'update', payload: {news}})
    }
  },
  reducers: {}
})
