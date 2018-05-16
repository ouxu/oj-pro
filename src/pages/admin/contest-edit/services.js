import request from 'utils/request'
import API from 'config/api'

const getContest = (id) => request({
  url: API.contestAdmin.replace(':id', id),
  method: 'get',
  token: true
})

const delContest = (id, data) => request({
  url: API.delContest.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const updateContest = (id, data) => request({
  url: API.updateContest.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const updateProblems = (id, data) => request({
  url: API.updateContestProblems.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const createContest = (data) => request({
  url: API.createContest,
  method: 'post',
  token: true,
  data
})

export { getContest, delContest, updateContest, createContest, updateProblems }
