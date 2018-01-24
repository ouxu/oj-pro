import React from 'react'
import App from 'routes/app'
import { LocaleProvider, Spin } from 'antd'
import { Route, Router } from 'dva/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Layout from 'components/Layout'
import dynamic from 'dva/dynamic'

dynamic.setDefaultLoadingComponent(() => {
  return (
    <Spin size='large' style={{
      width: '100%',
      margin: '60px auto'
    }} />
  )
})

export default ({history, app}) => {
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Route render={(props) => (
          <Layout {...props}>
            <App app={app} />
          </Layout>
        )} />
      </Router>
    </LocaleProvider>
  )
}
