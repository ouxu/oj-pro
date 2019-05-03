import React, { PureComponent } from 'react'
import { Avatar, Card, Icon, Input, List, Progress } from 'antd'
import Ellipsis from 'components/plugins/Ellipsis'
import message from 'utils/message'
import qs from 'query-string'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { newDate } from 'utils/dateAbout'
import { color } from 'utils/theme'
import './index.less'

const Search = Input.Search

/**
 * TODO 添加竞赛关联和用户关联
 */
@connect(({ contests, user }) => ({ contests, user }))
class Contests extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      presentTime: +Date.now()
    }
  }

  componentDidMount () {
    const { dispatch, location } = this.props
    const query = location.query
    dispatch({ type: 'contests/init', payload: query })
  }

  verifyPermission = record => {
    const { user } = this.props
    if (!user.token) {
      return message.warning('请先登录')
    }
    const presentTime = +Date.now()
    const startTime = newDate(record.start_time)
    const startStatus = presentTime > startTime
    if (startStatus) {
      this.props.dispatch(routerRedux.push('/contests/' + record.id))
    } else {
      message.warning('未开始')
    }
  }

  render () {
    const {
      contests: { contestsList = {} },
      location,
      dispatch
    } = this.props
    const { count, data = [] } = contestsList
    const { pathname, query } = location
    const { page, size, keyword } = query
    const pagination = {
      pageSize: +size || 20,
      current: +page || 1,
      total: count,
      pageSizeOptions: ['20', '50', '100'],
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        dispatch(routerRedux.push(pathname + '?' + qs.stringify({ ...query, page: current, size: pageSize })))
      },
      onChange: current => {
        dispatch(routerRedux.push(pathname + '?' + qs.stringify({ ...query, page: current })))
      }
    }
    const privatestatus = ['公开', '密码', '私有']
    const colorArr = {
      0: color.green,
      1: color.purple,
      2: color.red
    }
    const progress = {
      unstart: time => (
        <div>
          未开始 @ {time}
          <Progress percent={0} status='active' strokeWidth={5} />
        </div>
      ),
      running: (time, startTime, endTime) => (
        <div>
          进行中 @ {time}
          <Progress
            status='active'
            percent={parseInt((100 * (this.state.presentTime - startTime)) / (endTime - startTime))}
            strokeWidth={5}
            format={percent => percent}
          />
        </div>
      ),
      ended: time => (
        <div>
          已结束 @ {time}
          <Progress percent={100} status='success' strokeWidth={5} />
        </div>
      )
    }

    const listProps = {
      dataSource: data,
      size: 'large',
      rowKey: 'id',
      pagination,
      renderItem: item => {
        const { start_time, end_time } = item // eslint-disable-line
        const startTime = newDate(start_time)
        const endTime = newDate(end_time)
        const startStatus = this.state.presentTime < startTime
        const endStatus = this.state.presentTime > endTime
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  shape='square'
                  size='large'
                  style={{ minWidth: 48, minHeight: 48, backgroundColor: colorArr[item.private] }}
                >
                  <span style={{ lineHeight: '48px' }}>{privatestatus[item.private]}</span>
                </Avatar>
              }
              title={
                <div className='hand' onClick={() => this.verifyPermission(item)}>
                  <Ellipsis lines={1}>{item.title}</Ellipsis>
                </div>
              }
              description={
                <span>
                  <Icon type='user' className='mr-5' />
                  创建者：
                  {item.creator_name}
                </span>
              }
            />
            <div className='contests-item-process'>
              {startStatus && progress.unstart(start_time)}
              {startStatus === false && endStatus === false && progress.running(end_time, startTime, endTime)}
              {endStatus && progress.ended(end_time)}
            </div>
          </List.Item>
        )
      }
    }
    return (
      <Card bordered={false} className='m-16 contests'>
        <div className='contests-header flex-lol'>
          <span className='h-1'>竞赛&作业列表</span>
          <div>
            <Search
              enterButton
              placeholder='竞赛名称'
              style={{ width: 200 }}
              className='mr-10'
              defaultValue={keyword}
              onSearch={value => {
                dispatch(routerRedux.push(pathname + '?' + qs.stringify({ keyword: value })))
              }}
            />
          </div>
        </div>
        <List {...listProps} />
      </Card>
    )
  }
}

export default Contests
