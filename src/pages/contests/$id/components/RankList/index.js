/**
 * Created by out_xu on 17/3/11.
 */
import React, { Component } from 'react'
import { Table, Button } from 'antd'
import colorEncode from 'utils/colorEncode'
import { generateWord } from 'utils/numberAbout'
import message from 'utils/message'
import { newDate, sec2Str } from 'utils/dateAbout'
import { getRank, getDownloadUrl } from '../../service'
import './index.less'

const handleData = (data = {}) => {
  const { rank_data: rankData = [] } = data
  rankData.forEach((e, i) => {
    e.rank = i + 1
    e.user = (
      <a target='_blank' href={`/user/${e.user_id}`}>
        {' '}
        {e.user_name}
      </a>
    )
    e.time = sec2Str(e.time)
  })
  data.rank_data = rankData
  return data
}

class RankList extends Component {
  constructor (props) {
    super(props)

    this.interval = 60000

    this.state = {
      loading: false,
      rankData: {}
    }
  }

  componentDidMount () {
    this.getRankList()
  }

  componentWillUnmount () {
    this.timer && clearInterval(this.timer)
  }

  onAutoRefresh = () => {
    this.setState(state => {
      this.timer && clearInterval(this.timer)
      const { auto = false } = state
      if (auto) {
        message.info('自动刷新已关闭')
        return { auto: false }
      } else {
        message.info('自动刷新已开启，刷新间隔为 ' + this.interval + '毫秒')
        this.timer = setInterval(this.getRankList, this.interval)
        return { auto: true, scroll: false }
      }
    })
  }

  onAutoScroll = () => {
    this.setState(state => {
      this.timer && clearInterval(this.timer)
      const { scroll = false } = state
      if (scroll) {
        message.info('自动滚动已关闭')
        return { scroll: false }
      } else {
        message.info('自动滚动已开启')
        this.autoScroll()
        return { scroll: true, auto: false }
      }
    })
  }

  autoScroll = () => {}

  getRankList = () => {
    const id = this.props.id || ''
    this.setState({ loading: true })
    getRank(id).then(data => {
      this.setState({
        rankData: handleData(data, this.props.countNum),
        loading: false
      })
    })
  }

  render () {
    const { countNum } = this.props
    const { auto = false, scroll = false } = this.state

    const {
      rankData: { rank_data: rankData = [], first_ac = [] }, //eslint-disable-line
      loading
    } = this.state
    const columns = [
      {
        title: '排名',
        width: '50px',
        dataIndex: 'rank',
        fixed: 'left',
        className: 'contest-info-rank'
      },
      {
        title: '用户',
        dataIndex: 'user',
        fixed: 'left',
        className: 'contest-info-user',
        width: '100px'
      },
      {
        title: '解决',
        dataIndex: 'solved',
        width: '50px',
        className: 'contest-info-solved',
        fixed: 'left'
      },
      {
        title: '用时',
        dataIndex: 'time',
        className: 'contest-info-time',
        width: '90px'
      }
    ]
    if (rankData && rankData.length) {
      for (let i = 0; i < countNum; i++) {
        columns.push({
          title: generateWord(i + 1),
          render: record => colorEncode(record, i, first_ac),
          key: 'contest-info-time-' + i,
          className: 'contest-info-time',
          width: '90px'
        })
      }
    }
    return (
      <Table
        columns={columns}
        rowKey='user_id'
        dataSource={rankData}
        scroll={{ x: 'max-content' }}
        bordered
        pagination={false}
        loading={loading}
        className='contest-wrap-content-table contest-rank-table'
        title={() => (
          <Header
            auto={auto}
            scroll={scroll}
            toggleRefresh={this.onAutoRefresh}
            toggleScroll={this.onAutoScroll}
            {...this.props}
          />
        )}
      />
    )
  }
}

// TODO: 自动滚屏
const Header = props => {
  const { auto = false, toggleRefresh, scroll = false, toggleScroll, contestInfo = {}, endTime } = props
  const { id = '', title = '' } = contestInfo

  const end = +newDate(endTime)

  return (
    <div className='flex-lol'>
      <h1 className='h-1 my-8' style={{ fontWeight: 400 }}>
        <a target='_blank' href={'/contests/' + id}>
          <span> #{id} </span>
        </a>
        <span className='page-header-title-sub'>{title}</span>
      </h1>
      <div className='mt-8'>
        <Button.Group className='mr-8'>
          {end - Date.now() > 0 && (
            <Button onClick={toggleRefresh}>
              {auto ? '关闭' : '开启'}
              自动刷新
            </Button>
          )}
          {/* <Button onClick={toggleScroll}>
            {scroll ? '关闭' : '开启'}
            自动滚屏
          </Button> */}
        </Button.Group>
        <a target='_blank' href={getDownloadUrl(id)}>
          <Button type='primary'>导出榜单</Button>
        </a>
      </div>
    </div>
  )
}

export default RankList
