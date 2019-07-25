import React from 'react'
import QueueAnim from 'rc-queue-anim'
import { Button, Card, Icon, Divider, List, Tag } from 'antd'
import Link from 'umi/link'
import router from 'umi/router'
import { color } from 'utils/theme'

import API from 'config/api'
import request from 'utils/request'
import Result from 'components/plugins/Result'
import withInit from 'utils/withInit'
import errorHandler from 'utils/errorHandler'
import './index.less'

const fetchNews = async (props) => {
  try {
    const { query = {} } = props.location
    const { page = 1, size = 10 } = query
    const data = await request({
      url: API.news,
      data: {
        page,
        size
      }
    }).then((res) => res, () => ({}))
    return { data }
  } catch (e) {
    errorHandler(e)
    return { error: true }
  }
}

const privateStatus = ['固定', '普通', '重要', '紧急']
const colorArr = [color.blue, color.green, color.yellow, color.red]

const News = (props) => {
  const { data = {}, location } = props
  const { pathname, query = {} } = location
  const { page = 1, size = 10 } = query
  const { news, total_count: totalCount } = data
  const pagination = {
    current: +page,
    pageSize: +size,
    total: +totalCount,
    border: true,
    onChange: (current) => {
      router.replace({
        pathname,
        query: {
          ...query,
          page: current
        }
      })
    }
  }
  return (
    <QueueAnim className='mx-20 my-20' delay={200} type='bottom'>
      {!news.length ? (
        <Error />
      ) : (
        <Card hoverable className='news-list-wrap'>
          <div className='h-1 mb-16'>公告列表</div>
          <List
            itemLayout='horizontal'
            dataSource={news}
            // header={title}
            pagination={pagination}
            renderItem={(item) => (
              <List.Item actions={[<Link to={`/news?id=${item.id}`}>查看</Link>]}>
                <List.Item.Meta
                  title={<Link to={`/news?id=${item.id}`}>{item.title}</Link>}
                  description={
                    <div>
                      <Icon type='bulb' /> {item.created_at}
                      <Divider type='vertical' />
                      <Icon type='edit' /> {item.updated_at}
                    </div>
                  }
                />
                <Tag className='tags' color={colorArr[item.importance]}>
                  {privateStatus[item.importance]}
                </Tag>
              </List.Item>
            )}
          />
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
    title='新闻列表获取失败'
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
