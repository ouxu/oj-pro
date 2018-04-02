import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim'
import { Tag } from 'antd'
import { getContests, getMyContests } from 'services/contests'
import { connect } from 'dva'

@connect(({ user }) => ({ user }))
class ContestList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 9999,
      data: []
    }
  }
  componentWillMount () {
    const role = this.props.user.role || 'teacher'
    const query = {page: 1, size: 50, ...this.props.location.query}
    this.fetchData(role, query)
  }

  fetchData = async (role, data) => {
    let res = {}
    if (role === 'admin') {
      res = await getContests(data)
    } else {
      res = await getMyContests(data)
    }
    this.setState({
      count: res.total_count,
      data: res.contests
    })
  }
  render () {
    return (
      <QueueAnim delay={100}>
        <div className='h-1 mb-16' key='header'>
          竞赛列表
        </div>
        <div className='flex-lol' key='edit-bar' >
          <div>
            <Tag color='#86d068'>编辑</Tag>
            <Tag color='#f50'>删除</Tag>
          </div>
          <div>
            <Tag color='#108ee9'>添加</Tag>
          </div>
        </div>
      </QueueAnim>
    )
  }
}

export default ContestList
