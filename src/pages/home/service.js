/**
 * Created by out_xu on 17/8/20.
 */
import request from 'utils/request'
import API from 'config/api'

const getHotProblems = (data) => request({
  url: API.problemsSearch,
  method: 'get',
  data
})

const getHomeNews = () => request({
  url: API.newsIndex,
  method: 'get'
})

const getChartData = (data = { days: 12 }) => request({
  url: API.homeChart,
  method: 'get',
  data
})

export { getHotProblems, getHomeNews, getChartData }
