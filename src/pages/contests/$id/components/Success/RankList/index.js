/**
 * Created by out_xu on 17/3/11.
 */
import React, { Component } from 'react'
import Link from 'umi/link'
import { Table } from 'antd'
import colorEncode from 'utils/colorEncode'
import { generateWord } from 'utils/numberAbout'
import { newDate, sec2Str } from 'utils/dateAbout'
import Fullscreenable from 'react-fullscreenable'
import { getRank } from '../../../service'
import './index.less'

class RankList extends Component {
  constructor (props) {
    super(props)

    this.interval = 600000

    this.state = {
      loading: false,
      rankData: {}
    }
  }

  componentDidMount () {
    this.getRankList(this.props.id)

    this.timer = setInterval(() => {
      const end = +newDate(this.props.endTime)
      if (+Date.now() > end) {
        return clearInterval(this.timer)
      }
      this.getRankList(this.props.id)
    }, this.interval)
  }

  componentWillUnmount () {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearInterval(this.timer)
  }

  getRankList = (id) => {
    this.setState({loading: true})
    getRank(id).then((data) => {
      this.setState({
        rankData: data,
        loading: false
      })
    })
  }

  render () {
    const {countNum, isFullscreen, toggleFullscreen, contestInfo} = this.props
    const {rankData: {rank_data: rankData = [], first_ac = []}, loading} = this.state
    const columns = [{
      title: '排名',
      width: 50,
      render: (text, record, index) => index + 1,
      key: 'contest-info-rank',
      fixed: 'left',
      className: 'contest-info-rank'
    }, {
      title: '用户',
      render: record => (
        <span>
          <Link to={`/userpage/${record.user_id}`}> {record.user_name}</Link>
        </span>
      ),
      key: 'contest-info-user',
      fixed: 'left',
      className: 'contest-info-user',
      width: 100
    }, {
      title: '解决',
      dataIndex: 'solved',
      width: 50,
      key: 'contest-info-solved',
      className: 'contest-info-solved'
    }, {
      title: '用时',
      render: (record) => {
        return <span>{sec2Str(record.time)}</span>
      },
      key: 'contest-info-time',
      className: 'contest-info-time'
    }]
    for (let i = 0; i < countNum; i++) {
      columns.push({
        title: generateWord(i + 1),
        render: (record) => {
          return colorEncode(record, i, first_ac)
        },
        key: 'contest-info-problem-' + i,
        className: 'contest-info-problem',
        width: 90
      })
    }
    return (
      <Table
        columns={columns}
        rowKey={record => `contest-info-${record.user_id}`}
        dataSource={rankData}
        scroll={{x: countNum * 90 + 300, y: window.screen.availHeight - 155}}
        bordered
        pagination={false}
        loading={loading}
        className='contest-wrap-content-table contest-rank-table'
      />
    )
  }
}

export default Fullscreenable()(RankList)
