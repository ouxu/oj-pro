import request from 'utils/request'
import API from 'config/api'

const getToken = () => {
  const { token: ojToken = '' } = {
    ...JSON.parse(window.localStorage.getItem('NEUQ-OJ'))
  }
  return ojToken
}

const getRundata = id => request({
  url: API.rundata.replace(':id', id),
  token: true
})

const downloadRundata = (data, filename) => request.export({
  url: API.downloadRundata,
  token: true,
  method: 'post',
  filename,
  data
})

const getRundataFile = (data, filename) => request.fetch({
  url: API.downloadRundata,
  token: true,
  method: 'post',
  filename,
  data
})

const delRundata = (id, data) => request({
  url: API.deleteRundata.replace(':id', id),
  method: 'post',
  token: true,
  data
})

export { getToken, getRundata, downloadRundata, delRundata, getRundataFile }
