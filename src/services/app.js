import request from 'utils/request'

const query = () => request({
  url: '123',
  method: 'get',
  token: true
})

export { query }
