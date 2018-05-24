import request from 'utils/request'
import API from 'config/api'

// TODO password 字段必备但不校验
const delProblem = (id, data) =>
  request({
    url: API.deleteProblem.replace(':id', id),
    method: 'post',
    token: true,
    data
  })

const updateProblem = (id, data) =>
  request({
    url: API.updateProblem.replace(':id', id),
    method: 'post',
    token: true,
    data
  })

const createProblem = data =>
  request({
    url: API.createProblem,
    method: 'post',
    token: true,
    data
  })

export { delProblem, createProblem, updateProblem }
