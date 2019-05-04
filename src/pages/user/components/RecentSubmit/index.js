import React, { Component } from 'react'
import { Button } from 'antd'
import Link from 'umi/link'
import withInit from 'utils/withInit'
import errorHandler from 'utils/errorHandler'
import Result from 'components/plugins/Result'

import { getStatus } from '../../services'

const init = async props => {
  const { id = '' } = props
  const res = await getStatus({ user_id: id }).then(
    user => ({ user }),
    rej => {
      errorHandler(rej)
      return {
        error: true
      }
    }
  )
  return res
}

class RecentSubmit extends Component {
  render () {
    const { error = false, data = {} } = this.props
    if (error) {
      return (
        <Result
          style={{ marginTop: 80 }}
          type='error'
          title='提交信息获取失败'
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
      <div>
        RecentSubmit
        <div />
      </div>
    )
  }
}

export default withInit(init)(RecentSubmit)
