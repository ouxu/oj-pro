/**
 * Created by out_xu on 17/8/27.
 */
import request from 'utils/request'
import API from 'config/api'

const getProblem = (id) => request({
  url: API.problem.replace(':id', id),
  token: true,
  method: 'get'
})

const submit = (id, data) => request({
  url: API.problemSubmit.replace(':id', id),
  token: true,
  method: 'post',
  data
})

export { getProblem, submit }
