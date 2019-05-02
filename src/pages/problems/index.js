/**
 * Created by out_xu on 17/8/10.
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Card, Col, Row } from 'antd'
import UserStatus from './components/UserStatus'
import ProblemTable from './components/ProblemTable'
import RecentSubmit from './components/RecentSubmit'
import './index.less'

class ProblemsList extends PureComponent {
  componentDidMount () {
    const { dispatch, location } = this.props
    const query = location.query

    dispatch({ type: 'problems/init', payload: query })
  }

  render () {
    const { problems, dispatch, utils, location } = this.props
    const { problemsList, statusList } = problems
    const { loading } = utils
    const problemItemProps = { problemsList, loading, dispatch, location }
    const cardBodyStyle = { padding: 0 }
    return (
      <div className='m-16'>
        <Row gutter={12} type='flex' className='problems'>
          <Col className='left-content' xs={{ span: 24, order: 1 }} sm={{ span: 18 }}>
            <div className='keep-away'>
              <Card bodyStyle={cardBodyStyle} key='home-chart'>
                <ProblemTable {...problemItemProps} />
              </Card>
            </div>
          </Col>
          <Col className='right-content' xs={{ span: 24, order: 2 }} sm={{ span: 6 }}>
            <div delay={200} type='bottom'>
              <div key='user-status' className='user-status'>
                <UserStatus />
              </div>
              <div key='recent-submit'>
                <RecentSubmit statusList={statusList} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({ problems, utils }) => ({ problems, utils }))(ProblemsList)
