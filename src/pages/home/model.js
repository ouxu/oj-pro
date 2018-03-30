import modelExtend from 'dva-model-extend'
import { baseModel, loadingModel } from 'utils/modelExtend'
import { getHomeNews, getHotProblems, getChartData } from './service'
import sleep from 'utils/sleep'

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
    chartData: [],
    submits: {
      day: 999,
      month: 999,
      week: 999
    }
  },
  subscriptions: {},
  effects: {
    * init ({ payload }, { put, select, call }) {
      const homeDate = yield select(({ home }) => home)
      const { lastCheck, token } = yield select(({ user }) => user)
      const now = (new Date()).getTime()
      const { hotProblems, news, chartData } = homeDate
      if ((!!token && !lastCheck) || hotProblems.data.length === 0 || (now - lastCheck) < 10000) {
        yield put({ type: 'getHotProblems' })
      }
      if (news.latestNews.length < 1 && news.fixedNews.length < 1) {
        yield put({ type: 'getHomeNews' })
      }
      if (chartData.length < 1) {
        yield put({ type: 'getChartData' })
      }
    },
    * getHotProblems ({ payload = {} }, { put, call, select }) {
      const { data = [], page = 1, size = 20, count = 10000 } = payload
      if ((page - 1) * size > count) {

      } else {
        const query = {
          page,
          size,
          keyword: 'A+B'
        }
        try {
          const { problems, total_count } = yield call(getHotProblems, query)
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
          yield put({ type: 'update', payload: { hotProblems } })
        } catch (e) {
          throw e
        }
      }
    },
    * getHomeNews ({ payload }, { put, call, select }) {
      const { fixed_news: fixNews, latest_news: latestNews } = yield call(getHomeNews)
      const news = { fixNews, latestNews }
      yield put({ type: 'update', payload: { news } })
    },
    * getChartData ({ payload }, { put, call }) {
      const { statistics, submits } = yield call(getChartData)
      const chartData = Object.keys(statistics).map(key => ({
        time: key.slice(5).replace('-', '/'),
        submit: statistics[key].submit,
        accept: statistics[key].solved
      }))
      yield put({ type: 'update', payload: { chartData, submits } })
    }
  },
  reducers: {}
})
