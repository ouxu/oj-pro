import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Tabs, Divider } from 'antd'
import Process from './Process'
import Markdown from 'components/Markdown'

import './index.less'

class PageHeader extends Component {
  render () {
    const {contestsQuery = '', contestInfo = {}} = this.props
    const {id = '', title = '', description = ''} = contestInfo
    return (
      <div className='page-header'>
        <h1 className='page-header-title my-8'>
          <Link to={'/contests?' + contestsQuery}>
            <span> # Contest-</span>
          </Link>
          {id}
          <span className='page-header-title-sub'>{title}</span>
        </h1>
        <Process contestInfo={contestInfo} />
        {description.length > 0 && (
          <Markdown content={description} className='page-header-description' />
        )}
        <Tabs defaultActiveKey='1' className='tabs'>
          <Tabs.TabPane tab='题目列表' key='1' />
          <Tabs.TabPane tab='排行榜' key='2' />
        </Tabs>
      </div>
    )
  }
}

export default PageHeader
