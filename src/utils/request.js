import axios from 'axios'
import AppConfig from 'config/app'
import message from './message'

const baseConfig = {
  timeout: AppConfig.requestTime,
  baseURL: AppConfig.requestBaseURL
}

const myAxios = axios.create(baseConfig)

const getToken = () => {
  const { token: ojToken = '' } = {
    ...JSON.parse(window.localStorage.getItem('NEUQ-OJ'))
  }
  return ojToken
}

const fetch = (options, isExport) => {
  let { method = 'get', data, url, token = false, headers = {} } = options

  const ojToken = getToken()
  if (token) {
    if (!ojToken && token !== 'option') {
      throw new Error(400)
    }
  }

  headers = token ? { ...headers, token: ojToken } : headers

  if (isExport) {
    return myAxios.request({
      url,
      method,
      params: data,
      responseType: 'blob',
      headers: headers
    })
  }

  switch (method.toLowerCase()) {
    case 'get':
      return myAxios.get(url, {
        params: data,
        headers: headers
      })
    case 'delete':
      return myAxios.delete(url, {
        data: data,
        headers: headers
      })
    case 'post':
      return myAxios.post(url, data, { headers })
    case 'put':
      return myAxios.put(url, data, { headers })
    case 'patch':
      return myAxios.patch(url, data, { headers })
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
const request = async options => {
  const res = await fetch(options)

  const { data } = res
  if (data.code !== 0) {
    window.fundebug && window.fundebug.notifyError(data.code, options)
    throw new Error(data.code)
  }
  return data.data
}

request.export = async options => {
  try {
    const res = await fetch(options, true)
    downFile(res.data, options.filename)
    return res
  } catch {
    message.error('下载失败')
  }
}

request.downFile = downFile
request.fetch = fetch

export default request
