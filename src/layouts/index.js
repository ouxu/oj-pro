import React from 'react'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Layout from './layout'
import dynamic from 'dva/dynamic'

dynamic.setDefaultLoadingComponent(() => {
  return (
    <Spin size='large' style={{
      width: '100%',
      margin: '60px auto'
    }} />
  )
})

export default ({children}) => {
  return (
    <LocaleProvider locale={zhCN}>
      <Layout>
        {children}
      </Layout>
    </LocaleProvider>
  )
}
