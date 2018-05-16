import axios from 'axios'
import AppConfig from 'config/app'

const getToken = () => {
  const {token: ojToken = ''} = {
    ...JSON.parse(window.localStorage.getItem('NEUQ-OJ'))
  }
  return ojToken
}

const fetch = options => {
  let {
    method = 'get',
    data,
    url,
    token = false
  } = options

  let config = {
    timeout: AppConfig.requestTime,
    baseURL: AppConfig.requestBaseURL
  }

  if (token) {
    const ojToken = getToken()
    if (!ojToken && token !== 'option') {
      throw new Error(400)
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
    window.fundebug && window.fundebug.notifyError(data.code, options)
    throw new Error(data.code)
  }
  return data.data
}
