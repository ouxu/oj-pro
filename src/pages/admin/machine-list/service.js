import request from 'utils/request'
import API from 'config/api'

const getJudgeList = () => request({
  url: API.judgeList,
  method: 'get',
  token: true
})

const getJudgeInfo = (id) => request({
  url: API.judgeInfo.replace(':id', id),
  method: 'get',
  token: true
})

const addJudge = (data) => request({
  url: API.addJudge,
  method: 'post',
  token: true,
  data
})

const updateJudge = (id, data) => request({
  url: API.updateJudgeInfo.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const delJudge = (id) => request({
  url: API.delJudge.replace(':id', id),
  token: true
})

export { getJudgeList, getJudgeInfo, addJudge, updateJudge, delJudge }
