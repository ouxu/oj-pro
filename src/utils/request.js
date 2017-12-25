import axios from 'axios'

const fetch = options => {
  let {
    method = 'get',
    data,
    url,
    token = false
  } = options
  let config = {
    timeout: 30000,
    baseURL: 'http://oj.marklux.cn/'
  }

  if (token) {
    const {user: {token: ojToken = ''}} = {
      user: {},
      ...JSON.parse(window.localStorage.getItem('NEUQ-OJ'))
    }
    config = {
      ...config,
      headers: {'token': ojToken}
    }
  }
  const myAxios = axios.create(config)
  switch (method.toLowerCase()) {
    case 'get':
      return myAxios.get(url, {
        params: data
      })
    case 'delete':
      return myAxios.delete(url, {
        data: data
      })
    case 'post':
      return myAxios.post(url, data)
    case 'put':
      return myAxios.put(url, data)
    case 'patch':
      return myAxios.patch(url, data)
    case 'export':
      return myAxios.get(url, {
        params: data,
        responseType: 'blob'
      })
    default:
      return myAxios(options)
  }
}

const downFile = (blob, fileName) => {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, fileName)
  } else {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.target = '_blank'
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}

/**
 * Custom request based on axios
 * @param options See below examples
 * @returns {Promise.<*>}
 */
export default async options => {
  const res = await fetch(options)
  if (options.method === 'export') {
    downFile(res.data, options.filename)
    return true
  }
  const {data} = res
  if (data.code !== 0) {
    throw new Error(data.code)
  }
  return data.data
}
