import React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Layout from './layout'

export default ({children}) => {
  return (
    <LocaleProvider locale={zhCN}>
      <Layout>
        {children}
      </Layout>
    </LocaleProvider>
  )
}
