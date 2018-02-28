/**
 * Created by out_xu on 17/8/27.
 */
import request from 'utils/request'
import API from 'config/api'

const getProblem = (id) => request({
  url: API.problem.replace(':id', id),
  method: 'get',
  token: 'option'
})

const submit = (id, data) => request({
  url: API.problemSubmit.replace(':id', id),
  token: true,
  method: 'post',
  data
})

const submitContest = (cid, pnum, data) => request({
  url: API.contestSubmit.replace(':cid', cid).replace(':pnum', pnum),
  token: true,
  method: 'post',
  data
})

const getStatus = (id) => request({
  url: API.statusDetail.replace(':id', id),
  token: true,
  method: 'get'
})

const queryResult = (id) => request({
  url: API.queryResult.replace(':id', id),
  token: true,
  method: 'get'
})

export { getProblem, submit, submitContest, getStatus, queryResult }
