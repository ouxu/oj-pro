import request from 'utils/request'
import API from 'config/api'

const delProblem = (id, data) => request({
  url: API.deleteProblem.replace(':id', id),
  method: 'post',
  token: true,
  data
})

export {
  delProblem
}
