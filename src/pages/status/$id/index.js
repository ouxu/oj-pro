import React from 'react'
import QueueAnim from 'rc-queue-anim'
import { Button, Card, Icon, Tooltip } from 'antd'
import Link from 'umi/link'
import copy from 'copy-to-clipboard'

import Result from 'components/plugins/Result'
import withInit from 'utils/withInit'
import message from 'utils/message'
import errorHandler from 'utils/errorHandler'

import { getStatusDetail } from '../service'

import './index.less'

const onCopy = text => {
  copy(text)
  message.success('复制成功')
}

const fetchStatus = async props => {
  const id = props.match.params.id || ''
  try {
    // TODO: private 源码保护
    const data = await getStatusDetail(id)
    return { data }
  } catch (e) {
    errorHandler(e)
    return { error: true }
  }
}

const StatusDetail = props => {
  const id = props.match.params.id || ''
  const { data = {}, error } = props
  const { created_at: createAt, source = '' } = data
  return (
    <QueueAnim className='mx-20 my-20 status-detail-wrap' delay={200} type='bottom'>
      {error ? (
        <Error />
      ) : (
        <Card
          title={<span className='title'>{id}</span>}
          extra={
            <span className='title'>
              {createAt}
              <Tooltip title='复制'>
                <Icon type='copy' className='hand ml-8' onClick={() => onCopy(source)} />
              </Tooltip>
            </span>
          }
          hoverable
        >
          <pre>{source}</pre>
        </Card>
      )}
    </QueueAnim>
  )
}

const Error = () => (
  <Result
    className='pt-20'
    key='error'
    type='error'
    title='源码获取失败'
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

export default withInit(fetchStatus)(StatusDetail)
