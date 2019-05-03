import React from 'react'
import Link from 'umi/link'
import router from 'umi/router'
import request from 'utils/request'
import message from 'utils/message'
import { color } from 'utils/theme'
import API from 'config/api'
import { List, Icon, Tag, Tabs } from 'antd'
import './index.less'

const COUNT = 200
const SIZE = 50

export default class Ranklist extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      hasMore: true
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.location.query.scope !== this.props.location.query.scope) {
      this.setState({ data: [] }, () => {
        this.fetchData(1, this.props.location.query.scope)
      })
    }
  }

  componentDidMount () {
    const { scope = 'total' } = this.props.location.query
    this.fetchData(1, scope)
  }

  fetchData = (page, scope) => {
    this.setState({ loading: true })
    request({
      url: API.ranklist,
      method: 'get',
      data: { page, scope, size: SIZE }
    })
      .then(data => {
        this.setState({
          data: [...this.state.data, ...data],
          loading: false,
          hasMore: data.length === SIZE
        })
      })
      .catch(e => {
        this.setState({ loading: false })
        message.error('数据拉取失败，请刷新重试')
      })
  }
  loadMore = () => {
    const { scope = 'total' } = this.props.location.query
    const nextPage = ~~(this.state.data.length / SIZE) + 1
    this.fetchData(nextPage, scope)
  }
  tabChange = key => {
    router.replace({
      pathname: this.props.location.pathname,
      query: { scope: key }
    })
  }
  render () {
    const { data = [], loading, hasMore } = this.state
    return (
      <div className='ranklist'>
        <div className='page-header'>
          <h1 className='page-header-title my-8'>排行榜</h1>
          <div className='page-header-description'>AC：正确数，ANS：提交数，仅显示前200</div>
        </div>
        <div className='page-header-extra'>
          <Tabs activeKey={this.props.location.query.scope || 'total'} className='tabs' onChange={this.tabChange}>
            <Tabs.TabPane tab='总榜' key='total' />
            <Tabs.TabPane tab='月榜' key='m' />
            <Tabs.TabPane tab='周榜' key='w' />
            <Tabs.TabPane tab='日榜' key='d' />
          </Tabs>
        </div>
        <div className='m-16 px-16 bg-white ranklist-content'>
          <List
            footer={
              <a
                className='flex-center table-footer'
                disabled={data.length === COUNT || !hasMore}
                onClick={this.loadMore}
              >
                {data.length === COUNT || !hasMore ? (
                  <span>我是有底线的，到头了</span>
                ) : (
                  <span>{loading && <Icon type='loading' />} 加载更多</span>
                )}
              </a>
            }
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <div>
                    AC：
                    {item.solved}
                  </div>,
                  <div>
                    ANS：
                    {item.submit}
                  </div>
                ]}
              >
                <Link to={'/user/' + item.id}>
                  <Tag className='rank-tag' color={color.blue}>
                    {index + 1}
                  </Tag>
                  {item.name}
                </Link>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}
