import request from 'utils/request'
import API from 'config/api'

const getInfo = () => request({
  url: API.userMe,
  method: 'get',
  token: true
})

const getInfoById = (id) => request({
  url: API.userInfo.replace(':id', id),
  method: 'get'
})

const updateUserInfo = (data) => request({
  url: API.updateUserInfo,
  method: 'post',
  token: true,
  data
})

const modifyPassword = (data) => request({
  url: API.modifyPassword,
  method: 'post',
  token: true,
  data
})

const getStatus = (data) => request({
  url: API.status,
  method: 'get',
  token: true,
  data
})

export { getInfo, getInfoById, modifyPassword, updateUserInfo, getStatus }
