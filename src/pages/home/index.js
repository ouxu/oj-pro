/**
 * title: Home Page
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Card, Col, Row } from 'antd'
import dynamic from 'umi/dynamic'
import ProblemItem from './components/ProblemItem'
import HomeBanner from './components/HomeBanner'
import NewsPanel from './components/NewsPanel'
import StatusPanel from './components/StatusPanel'

const HomeChart = dynamic({
  loader: () => import('./components/HomeChart')
})

class Home extends PureComponent {
  componentDidMount () {
    this.props.dispatch({ type: 'home/init' })
  }

  render () {
    const { home, dispatch, utils } = this.props
    const { hotProblems, news, chartData, submits } = home
    const { loading } = utils
    const problemItemProps = { hotProblems, loading, dispatch }
    const cardBodyStyle = { padding: 0 }
    return (
      <div className='homepage m-16'>
        <Row gutter={12} type='flex'>
          <Col className='left-content' xs={{ span: 24, order: 2 }} sm={{ span: 18 }}>
            <div>
              <div key='home-banner'>
                <HomeBanner news={news} />
              </div>
              <Card bodyStyle={cardBodyStyle} style={{ marginBottom: 10 }} key='home-chart'>
                <HomeChart chartData={chartData} />
              </Card>
              <Card bodyStyle={cardBodyStyle} key='problem-list' className='mb-10'>
                <ProblemItem {...problemItemProps} />
              </Card>
            </div>
          </Col>
          <Col className='right-content' xs={{ span: 24, order: 1 }} sm={{ span: 6, order: 3 }}>
            <div>
              <div key='status-panel' className='status-panel'>
                <StatusPanel submits={submits} />
              </div>
              <div key='news-panel'>
                <NewsPanel news={news} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({ home, utils }) => ({ home, utils }))(Home)
