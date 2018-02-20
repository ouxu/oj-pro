import dva from 'dva'
import createHistory from 'history/createBrowserHistory'
import errorHandler from 'utils/errorHandler'

let instance = null

const config = {
  history: createHistory(),
  initialState: JSON.parse(window.localStorage.getItem('NEUQ-OJ')),
  onError: errorHandler
}

export default function () {
  if (!instance) {
    instance = dva(config)
  }
  return instance
}
