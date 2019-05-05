import request from 'utils/request'
import API from 'config/api'

const getHomeNews = (data) => request({
  url: API.news,
  method: 'get',
  data
})

const getNewsDetail = (id) => request({
  url: API.newsDetail.replace(':id', id),
  method: 'get'
})

const editNews = (id, data) => request({
  url: API.editNews.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const delNews = (id, data) => request({
  url: API.delNews.replace(':id', id),
  method: 'get',
  token: true,
  data
})

const createNews = (data) => request({
  url: API.createNews,
  method: 'post',
  token: true,
  data
})

export { getHomeNews, getNewsDetail, editNews, createNews, delNews }
