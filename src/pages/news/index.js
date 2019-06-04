import React from 'react'
import QueueAnim from 'rc-queue-anim'
import { Button, Card, Icon, Divider } from 'antd'
import Link from 'umi/link'

import API from 'config/api'
import request from 'utils/request'
import Result from 'components/plugins/Result'
import Markdown from 'components/plugins/Markdown/async'
import withInit from 'utils/withInit'
import errorHandler from 'utils/errorHandler'
import './index.less'

const fetchNews = async props => {
  const { id = '' } = props.location.query
  try {
    const data = await request({ url: API.newsDetail.replace(':id', id) }).then(res => res, () => ({}))
    return { data }
  } catch (e) {
    errorHandler(e)
    return { error: true }
  }
}

const News = props => {
  const { data = {} } = props
  const { id, title, content } = data
  const { author_name: authorName, updated_at: updateAt } = data
  return (
    <QueueAnim className='mx-20 my-20' delay={200} type='bottom'>
      {!id ? (
        <Error />
      ) : (
        <Card hoverable className='news-detail-wrap'>
          <h2 className='title'>{title}</h2>
          <div className='meta'>
            <span className='update-at'>
              <Icon type='rocket' className='mr-2' />
              {updateAt}
            </span>
            <Divider type='vertical' />
            <span className='update-at'>
              <Icon type='user' className='mr-2' />
              {authorName}
            </span>
          </div>
          <Markdown content={content} />
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
    title='新闻获取失败'
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

export default withInit(fetchNews)(News)
