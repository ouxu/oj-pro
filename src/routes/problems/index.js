/**
 * Created by out_xu on 17/8/10.
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Col, Row } from 'antd'
import QueueAnim from 'rc-queue-anim'
import UserStatus from './UserStatus'
import ProblemTable from './ProblemTable'
import RecentSubmit from './RecentSubmit'
import qs from 'query-string'
import './index.less'
import windowScroll from 'utils/scrollToAnchor'
class ProblemsList extends Component {
  componentDidMount () {
    const {dispatch, location} = this.props
    const query = qs.parse(location.search)
    dispatch({type: 'problems/init', payload: query})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const {dispatch} = this.props
      const query = qs.parse(nextProps.location.search)
      dispatch({type: 'problems/init', payload: query})
      windowScroll('navigation')
    }
  }
  render () {
    const {problems, dispatch, utils, location} = this.props
    const {problemsList, statusList} = problems
    const {loading} = utils
    const problemItemProps = {problemsList, loading, dispatch, location}
    const cardBodyStyle = {padding: 0}
    return (
      <div className='m-16'>
        <Row gutter={12} type='flex' className='problems'>
          <Col className='left-content' xs={{span: 24, order: 1}} sm={{span: 18}}>
            <QueueAnim delay={100} interval={200} className='keep-away'>
              <Card bodyStyle={cardBodyStyle} key='home-chart'>
                <ProblemTable {...problemItemProps} />
              </Card>
            </QueueAnim>
          </Col>
          <Col className='right-content' xs={{span: 24, order: 2}} sm={{span: 6}}>
            <QueueAnim delay={200} type='bottom'>
              <div key='user-status' className='user-status'>
                <UserStatus />
              </div>
              <div key='recent-submit'>
                <RecentSubmit statusList={statusList} />
              </div>
            </QueueAnim>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({problems, utils}) => ({problems, utils}))(ProblemsList)
