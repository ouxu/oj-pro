/**
 * Created by out_xu on 17/8/20.
 */
import request from 'utils/request'
import API from 'config/api'
import AppConfig from 'config/app'

const getContest = id => request({
  url: API.contest.replace(':id', id),
  method: 'get'
})

const joinContest = (id, data) => request({
  url: API.joinContest.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const getRank = id => request({
  url: API.contestRankList.replace(':id', id),
  method: 'get'
})

const getDownloadUrl = id => AppConfig.requestBaseURL + API.downRankList.replace(':id', id)

export { getContest, joinContest, getRank, getDownloadUrl }
