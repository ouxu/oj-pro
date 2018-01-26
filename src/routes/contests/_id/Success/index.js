import React, { Component } from 'react'
import { Card, Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import PageHeader from './PageHeader'
import qs from 'query-string'
import ProblemList from './ProblemList'
import RankList from './RankList'
import './index.less'

class Success extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: 'problem'
    }
  }

  tabChange = (value) => {
    this.setState({tab: value})
  }

  render () {
    const {contests = {}, contest = {}, dispatch, id} = this.props
    const {tab} = this.state
    const {contest_info: contestInfo = {}, problem_info: problemInfo = []} = contest
    const {contestsList: {page = '', size = '', keyword = ''}} = contests
    const contestsQuery = qs.stringify({page, size, keyword})

    return (
      <div className='contest-wrap'>
        <PageHeader
          dispatch={dispatch}
          contestsQuery={contestsQuery}
          contestInfo={contestInfo}
        />
        <div className='page-header-extra'>
          <Tabs activeKey={tab} className='tabs' onChange={this.tabChange}>
            <Tabs.TabPane tab='题目列表' key='problem' forceRender>
              <Card bodyStyle={{padding: 0}} bordered={false} className='main-content'>
                <ProblemList problemInfo={problemInfo} id={id} dispatch={dispatch} />
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab='排行榜' key='rank'>
              <div className='main-content'>
                <RankList
                  countNum={problemInfo.length}
                  endTime={contestInfo.end_time}
                  contestInfo={contestInfo}
                  id={id}
                  scroll={{x: 960}}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default Success
