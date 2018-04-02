/**
 * Created by out_xu on 17/8/20.
 */
import request from 'utils/request'
import API from 'config/api'

const getContests = (data) => request({
  url: API.contests,
  method: 'get',
  token: 'option',
  data
})

const getMyContests = (data) => request({
  url: API.contestsMine,
  method: 'get',
  token: true,
  data
})

const searchContests = (data) => request({
  url: API.contestsSearch,
  method: 'get',
  token: 'option',
  data
})

export { getContests, searchContests, getMyContests }
