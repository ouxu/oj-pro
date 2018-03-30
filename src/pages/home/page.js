/**
 * Created by out_xu on 17/8/10.
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Card, Col, Row } from 'antd'
import QueueAnim from 'rc-queue-anim'

import ProblemItem from './ProblemItem'
import HomeBanner from './HomeBanner'
import NewsPanel from './NewsPanel'
import StatusPanel from './StatusPanel'
import HomeChart from './HomeChart'

class Home extends PureComponent {
  componentDidMount () {
    this.props.dispatch({type: 'home/init'})
  }

  render () {
    const {home, dispatch, utils} = this.props
    const { hotProblems, news, chartData, submits } = home
    const {loading} = utils
    const problemItemProps = {hotProblems, loading, dispatch}
    const cardBodyStyle = {padding: 0}
    return (
      <div className='homepage m-16'>
        <Row gutter={12} type='flex'>
          <Col className='left-content' xs={{span: 24, order: 2}} sm={{span: 18}}>
            <QueueAnim delay={100} interval={200}>
              <div key='home-banner'>
                <HomeBanner />
              </div>
              <Card bodyStyle={cardBodyStyle} style={{marginBottom: 10}} key='home-chart'>
                <HomeChart chartDate={chartData} />
              </Card>
              <Card bodyStyle={cardBodyStyle} key='problem-list' className='mb-10'>
                <ProblemItem {...problemItemProps} />
              </Card>
            </QueueAnim>
          </Col>
          <Col className='right-content' xs={{span: 24, order: 1}} sm={{span: 6, order: 3}}>
            <QueueAnim delay={200} type='bottom'>
              <div key='status-panel' className='status-panel'>
                <StatusPanel submits={submits} />
              </div>
              <div key='news-panel'>
                <NewsPanel news={news} />
              </div>
            </QueueAnim>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({home, utils}) => ({home, utils}))(Home)
