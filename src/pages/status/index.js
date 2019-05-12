import React, { Component } from 'react'
import { Table, Icon, Button } from 'antd'
import Link from 'umi/link'
import { connect } from 'dva'
import errorHandler from 'utils/errorHandler'
import { statusColumns as columns } from 'config/tableConfig'
import { getStatus } from './service'
import SearchBar from './components/SearchBar'
import Result from 'components/plugins/Result'

import './index.less'

const PAGE_SIZE = 20

@connect(({ user }) => ({ user }))
class Status extends Component {
  state = {}

  componentDidMount () {
    this.fetchData()
  }

  loadMore = () => {
    const { page } = this.state
    this.fetchData({ page: page + 1 }, false)
  }

  fetchData = async (body = {}, clear = true) => {
    const { query } = this.props.location
    for (const key in query) {
      if (query[key]) {
        body[key] = query[key]
      }
    }

    body.size = PAGE_SIZE
    this.setState({ loading: true })
    try {
      const res = await getStatus(body)
      if (clear) {
        this.setState({ data: res, page: 1 })
      } else {
        this.setState(state => {
          const { data = [] } = state
          data.push(...res)
          return { data, page: body.page || 1 }
        })
      }
    } catch (e) {
      this.setState({ error: true })
      errorHandler(e)
    }
    this.setState({ loading: false })
  }

  render () {
    const { data = [], loading, error = false } = this.state
    const { user = {}, location } = this.props
    const canLoad = data.length % PAGE_SIZE === 0
    if (error) {
      return (
        <Result
          className='pt-20'
          type='error'
          title='提交状态获取失败'
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
      <div className='p-16 status-wrap'>
        <Table
          bordered
          title={() => <SearchBar user={user} location={location} />}
          columns={columns}
          rowKey='id'
          rowClassName={(record, index) => (index % 2 ? 'color-row' : '')}
          dataSource={data}
          pagination={false}
          footer={data => (
            <a className='flex-center table-footer' disabled={!canLoad}>
              {!canLoad ? (
                <span>
                  <Icon type='smile-o' /> 加载完毕
                </span>
              ) : (
                <span onClick={this.loadMore}>{loading && <Icon type='loading' />} 加载更多</span>
              )}
            </a>
          )}
        />
      </div>
    )
  }
}

export default Status
