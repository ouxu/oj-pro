import request from 'utils/request'
import API from 'config/api'

const check = () => request({
  url: API.tokenVerify,
  method: 'get',
  token: true
})

const login = (data) => request({
  url: API.login,
  method: 'post',
  data
})

const logout = () => request({
  url: API.logout,
  method: 'get',
  token: true
})

export { check, login, logout }
