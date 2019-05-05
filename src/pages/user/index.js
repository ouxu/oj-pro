import React from 'react'
import { Button, Tabs } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import withInit from 'utils/withInit'
import errorHandler from 'utils/errorHandler'
import Result from 'components/plugins/Result'

import PageHeader from './components/PageHeader'
import Userinfo from './components/Userinfo'
import RecentSubmit from './components/RecentSubmit'
import EditInfo from './components/EditInfo'
import ResetPassword from './components/ResetPassword'

import { getInfo } from './service'
import './index.less'

const TabPane = Tabs.TabPane

const init = async props => {
  const { dispatch } = props
  const res = await getInfo().then(
    user => ({ user }),
    rej => {
      errorHandler(rej, dispatch)
      return {
        error: true
      }
    }
  )
  return res
}

const Userpage = props => {
  const { error = false, user = {}, reInit } = props
  if (error) {
    return (
      <Result
        style={{ marginTop: 80 }}
        type='error'
        title='用户信息获取失败'
        actions={
          <div>
            <Button onClick={() => window.location.reload()}>刷新重试</Button>
            <Button type='primary'>
              <Link to='/home'>返回首页</Link>
            </Button>
          </div>
        }
      />
    )
  }
  return (
    <div className='user-wrap'>
      <PageHeader userInfo={user} />
      <div className='user-main'>
        <Tabs defaultActiveKey='userinfo' tabPosition='left'>
          <TabPane tab='用户信息' key='userinfo'>
            <Userinfo user={user} />
          </TabPane>
          <TabPane tab='近期提交' key='recent'>
            <RecentSubmit id={user.id} />
          </TabPane>
          <TabPane tab='修改信息' key='setting'>
            <EditInfo user={user} reInit={reInit} />
          </TabPane>
          <TabPane tab='修改密码' key='password'>
            <ResetPassword id={user.id} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default connect()(withInit(init)(Userpage))
