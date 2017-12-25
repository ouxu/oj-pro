import dva from 'dva'
import createHistory from 'history/createBrowserHistory'
import errorHandler from 'utils/errorHandler'
import registerModel from 'utils/registerModel'
import router from './router'
import models from './models'
import './style/index.less'
const app = dva({
  history: createHistory(),
  initialState: JSON.parse(window.localStorage.getItem('NEUQ-OJ')),
  onError: errorHandler
})

// 2. Model
models.forEach(e => registerModel(app, e))

// 3. Router
app.router(router)

// 4. Start
app.start('#root')
