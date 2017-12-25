/**
 * Created by out_xu on 17/8/20.
 */
import request from 'utils/request'
import API from 'config/api'

const getProblems = (data) => request({
  url: API.problems,
  token: true,
  method: 'get',
  data
})

const searchProblems = (data) => request({
  url: API.problemsSearch,
  token: true,
  method: 'get',
  data
})

const getRecording = () => request({
  url: API.status,
  method: 'get',
  token: true
})

export { getProblems, getRecording, searchProblems }