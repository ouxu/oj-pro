import React, { Component } from 'react'
import { Card } from 'antd'
import PageHeader from './PageHeader'
import ProblemList from './ProblemList'

import './index.less'

export default props => {
  const { contest = {}, dispatch, id, location } = props
  const { contest_info: contestInfo = {}, problem_info: problemInfo = [] } = contest
  const { pathname } = location
  return (
    <div className='contest-wrap'>
      <PageHeader dispatch={dispatch} contestInfo={contestInfo} pathname={pathname} />
      <div className='page-header-extra'>
        <Card bodyStyle={{ padding: 0 }} bordered={false} className='main-content'>
          <ProblemList problemInfo={problemInfo} id={id} dispatch={dispatch} />
        </Card>
      </div>
    </div>
  )
}
