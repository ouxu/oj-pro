import React, { Component, Fragment } from 'react'
import router from 'umi/router'
import Link from 'umi/link'
import { Tag, List, Divider, Input, Avatar, Button } from 'antd'
import { getContests, getMyContests } from 'services/contests'
import { connect } from 'dva'
import { color } from 'utils/theme'
const privateStatus = ['公开', '密码', '私有']
const colorArr = {
  0: color.green,
  1: color.purple,
  2: color.red
}

@connect(({ user }) => ({ user }))
class ContestList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 9999,
      data: []
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.location !== this.props.location) {
      this.fetchData()
    }
  }

  fetchData = async () => {
    const role = this.props.user.role || 'teacher'
    const data = { page: 1, size: 50, ...this.props.location.query }
    let res = {}
    if (role === 'admin') {
      res = await getContests(data)
    } else {
      res = await getMyContests(data)
    }
    this.setState({
      count: res.total_count,
      data: res.contests ? res.contests : []
    })
  }

  editContest = record => {
    router.push({
      pathname: '/admin/contest-edit',
      query: {
        id: record.id
      }
    })
  }

  createContest = () => {
    router.push('/admin/contest-edit')
  }

  render () {
    const { data = [], count } = this.state
    const { query, pathname } = this.props.location

    const { page, size } = query
    const pagination = {
      pageSize: +size || 50,
      current: +page || 1,
      total: count,
      pageSizeOptions: ['20', '50', '100'],
      showSizeChanger: true,
      border: true,
      onShowSizeChange: (current, pageSize) => {
        router.replace({
          pathname,
          query: {
            ...query,
            page: current,
            size: pageSize
          }
        })
      },
      onChange: current => {
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
      <Fragment>
        <div className='mb-16 flex-lol' key='header'>
          <span className='h-1'>竞赛列表</span>
          <span>
            <Button
              type='primary'
              className='mr-8'
              onClick={this.createContest}
            >
              新建
            </Button>
            <Input.Search
              placeholder='竞赛名称'
              style={{ width: 200 }}
              className='mr-10'
              onSearch={value => {
                router.replace({
                  pathname,
                  query: {
                    ...query,
                    keyword: value
                  }
                })
              }}
            />
          </span>
        </div>
        <div className='contest-list'>
          <List
            itemLayout='horizontal'
            dataSource={data}
            pagination={pagination}
            key='contests-list'
            renderItem={item => (
              <List.Item
                actions={[<a onClick={() => this.editContest(item)}>编辑</a>]}
              >
                <List.Item.Meta
                  title={
                    <span>
                      <Tag color='#2db7f5'>
                        <Link target='_black' to={`/contests/${item.id}`}>
                          {item.id}
                        </Link>
                      </Tag>
                      {item.title}
                    </span>
                  }
                  description={
                    <div style={{width: 'max-content'}}>
                      开始时间： {item.start_time}
                      <Divider type='vertical' />
                      结束时间： {item.end_time}
                    </div>
                  }
                />
                <Avatar
                  shape='square'
                  size='large'
                  style={{
                    minWidth: 48,
                    minHeight: 48,
                    backgroundColor: colorArr[item.private]
                  }}
                >
                  <span style={{ lineHeight: '48px' }}>
                    {privateStatus[item.private]}
                  </span>
                </Avatar>
              </List.Item>
            )}
          />
        </div>
      </Fragment>
    )
  }
}

export default ContestList
