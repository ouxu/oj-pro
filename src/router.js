import React from 'react'
import App from 'routes/app'
import { LocaleProvider, Spin } from 'antd'
import { Route, Router } from 'dva/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Layout from 'components/Layout'
import dynamic from 'dva/dynamic'
import ProblemsDetailModel from './routes/problems/_id/model'
import ContestsModel from './routes/contests/model'
import Contests from './routes/contests'
import ProblemsModel from './routes/problems/model'
import ContestsDetail from './routes/contests/_id/route'
import homeModel from './routes/home/model'
import Homepage from './routes/home'
import Admin from './routes/admin/route'
import dynamicWrapper from './utils/dynamicWrapper'
import Problems from './routes/problems'
import ProblemDetail from './routes/problems/_id/route'
import NotFound from './routes/404'
import ContestsDetailModel from './routes/contests/_id/model'

dynamic.setDefaultLoadingComponent(() => {
  return (
    <Spin size='large' style={{
      width: '100%',
      margin: '60px auto'
    }} />
  )
})

const getRouteDate = (app) => [
  {
    path: '/home',
    exact: true,
    models: [homeModel],
    component: Homepage
  }, {
    path: '/problems/:id',
    exact: true,
    component: dynamicWrapper(ProblemDetail, app, [ProblemsDetailModel])
  }, {
    path: '/problems',
    exact: false,
    models: [ProblemsModel],
    component: Problems
  }, {
    path: '/contests/:id',
    exact: true,
    models: [ContestsModel],
    component: dynamicWrapper(ContestsDetail, app, [ContestsDetailModel])
  }, {
    path: '/contests',
    exact: false,
    models: [ContestsModel],
    component: Contests
  }, {
    path: '/admin',
    component: Admin
  }, {
    path: '/404',
    exact: true,
    component: NotFound
  }
]

export default ({history, app}) => {
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Route render={(props) => (
          <Layout {...props}>
            <App app={app} routerDate={getRouteDate(app)} />
          </Layout>
        )} />
      </Router>
    </LocaleProvider>
  )
}
