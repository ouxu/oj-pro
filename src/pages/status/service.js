import request from 'utils/request'
import API from 'config/api'

const getStatus = (data) => request({
  url: API.status,
  method: 'get',
  token: true,
  data
})

const getStatusDetail = (id) => request({
  url: API.statusDetail.replace(':id', id),
  method: 'get',
  token: true
})

export { getStatus, getStatusDetail }
