/**
 * Created by out_xu on 17/8/25.
 */
import React, { Component } from 'react'
import { Col, Icon, Row } from 'antd'
import { connect } from 'dva'
import ProblemEditor from './components/ProblemEditor'
import './index.less'
import ProblemDetail from './components/ProblemDetail'

class ProblemPage extends Component {
  componentDidMount () {
    const {dispatch, match, location} = this.props
    dispatch({
      type: 'problem/init',
      payload: {
        id: match.params.id,
        query: location.query
      }
    })
    const {solution = ''} = location.query
    if (solution) {
      dispatch({type: 'problem/getStatus', payload: {result: solution}})
    }
  }

  render () {
    const {problems, problem, match, dispatch, user, location, contest} = this.props
    const {detail, layout, editor, activeKey, solutionId} = problem
    const {problemsList} = problems
    const {params} = match
    const editorProps = {dispatch, params, user, location, ...editor}
    const detailProps = {activeKey, dispatch, location, detail, solutionId, problemsList, contest}
    return (
      <Row type='flex' className='problem-page'>
        <Col xs={24} sm={layout.left} className='left pl-10'>
          <ProblemDetail {...detailProps} />
        </Col>
        <Col xs={24} sm={layout.right} className='right'>
          <div className='action hand' onClick={() => dispatch({type: 'problem/changeLayout'})}>
            <Icon type={layout.left === 10 ? 'right' : 'left'} />
          </div>
          <ProblemEditor {...editorProps} />
        </Col>
      </Row>
    )
  }
}

export default connect(({user, problems, problem, contest}) => ({user, problems, problem, contest}))(ProblemPage)
