import React, { PureComponent } from 'react'
import { Avatar, Card, Icon, Input, List, Progress, Radio } from 'antd'
import message from 'utils/message'
import qs from 'query-string'
import { connect } from 'dva'
import windowScroll from 'utils/scrollToAnchor'
import { Link, routerRedux } from 'dva/router'
import { newDate } from 'utils/dateAbout'
import { color } from 'utils/theme'

const Search = Input.Search
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

@connect(({contests, user}) => ({contests, user}))
class Contests extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      presentTime: +Date.now()
    }
  }

  componentDidMount () {
    const {dispatch, location} = this.props
    const query = qs.parse(location.search)
    dispatch({type: 'contests/init', payload: query})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const {dispatch} = this.props
      const query = qs.parse(nextProps.location.search)
      dispatch({type: 'contests/init', payload: query})
      windowScroll('navigation')
    }
  }

  verifyPermission = async (record) => {
    const presentTime = +Date.now()
    try {
      const startTime = newDate(record.start_time)
      const startStatus = (presentTime > startTime)
      if (startStatus) {
        // if (record.private === 1) {
        //   await this.props.tokenVerify()
        //   await this.props.getContest(record.id)
        // } else if (record.private === 2) {
        //   await this.props.getContest(record.id)
        // }
        // goto(`/contests/${record.id}`)
      } else {
        message.warn('未开始')
      }
    } catch (e) {
      if (e.message === '未登录') {
        message.error(e.message)
      } else if (e.message === '权限不足' && record.private === 1) {
        this.setState({
          contestId: record.id,
          visible: true
        })
      }
    }
  }

  render () {
    const {contests: {contestsList = {}}, location, dispatch} = this.props
    const {page, size, count, data = []} = contestsList
    const {pathname, search} = location
    const query = qs.parse(search)

    const pagination = {
      pageSize: +size || 20,
      current: +page || 1,
      total: count,
      pageSizeOptions: ['20', '50', '100'],
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        dispatch(routerRedux.push(pathname + '?' + qs.stringify({...query, page: current, size: pageSize})))
      },
      onChange: (current) => {
        dispatch(routerRedux.push(pathname + '?' + qs.stringify({...query, page: current})))
      }
    }
    const privatestatus = [
      '公开',
      '加密',
      '私有'
    ]
    const colorArr = {
      0: color.green,
      1: color.purple,
      2: color.red
    }
    const progress = {
      unstart: time => (
        <div>
          未开始 @ {time}
          <Progress
            percent={0}
            status='active'
            strokeWidth={5}
            className='contests-status-progress'
          />
        </div>
      ),
      running: (time, startTime, endTime) => (
        <div>
          进行中 @ {time}
          <Progress
            status='active'
            percent={parseInt(100 * (this.state.presentTime - startTime) / (endTime - startTime))}
            strokeWidth={5}
            format={percent => percent}
          />
        </div>
      ),
      ended: time => (
        <div>
          已结束 @ {time}
          <Progress
            percent={100}
            status='success'
            strokeWidth={5}
            className='contests-status-progress'
          />
        </div>
      )
    }

    const listProps = {
      dataSource: data,
      size: 'large',
      rowKey: 'id',
      pagination,
      renderItem: item => {
        const {creator_id, creator_name, start_time, end_time} = item
        const startTime = newDate(start_time)
        const endTime = newDate(end_time)
        const startStatus = (this.state.presentTime < startTime)
        const endStatus = (this.state.presentTime > endTime)
        return (
          <List.Item
            // actions={[<a>编辑</a>]}
          >
            <List.Item.Meta
              avatar={(
                <Avatar
                  shape='square' size='large'
                  style={{minWidth: 48, minHeight: 48, backgroundColor: colorArr[item.private]}}>
                  <span style={{lineHeight: '48px'}}>{privatestatus[item.private]}</span>
                </Avatar>
              )}
              title={<Link to={item.id || ''}>{item.title}</Link>}
              description={(
                <div>
                  <span><Icon type='user' className='mr-5' />创建者：{item.creator_name}</span>
                </div>
              )}
            />
            <div>
              {startStatus && progress.unstart(start_time)}
              {(startStatus === false && endStatus === false) && progress.running(end_time, startTime, endTime)}
              {endStatus && progress.ended(end_time)}
            </div>
          </List.Item>
        )
      }
    }
    return (
      <Card
        bordered={false}
        className='m-16'
      >
        <div className='flex-lol'>
          <h3 className='text-bold text-large'>竞赛&作业列表</h3>
          <div className='flex-lol'>
            <RadioGroup defaultValue='all'>
              <RadioButton value='all'>全部</RadioButton>
              <RadioButton value='progress'>进行中</RadioButton>
              <RadioButton value='waiting'>等待中</RadioButton>
            </RadioGroup>
            <Search
              placeholder='竞赛名称'
              className='ml-10'
              style={{width: 200}}
              onSearch={(value) => {
                dispatch(routerRedux.push(pathname + '?' + qs.stringify({...query, keyword: value})))
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
