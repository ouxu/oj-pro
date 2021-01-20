/**
 * Created by out_xu on 17/8/25.
 */
import React, { Component } from 'react'
import { Row, Col, Icon, Button } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'

import ProblemEditor from './components/ProblemEditor'
import ProblemDetail from './components/ProblemDetail'
import withInit from 'utils/withInit'
import { getProblem, submit } from './service'
import errorHandler from 'utils/errorHandler'
import Result from 'components/plugins/Result'

import './index.less'

const baseLink = '/problems/'

const init = async props => {
  const { match, dispatch, user } = props
  const id = match.params.id
  const intPnum = Number(id)

  try {
    const detail = await getProblem(id)
    const meta = {
      id,
      baseLink,
      canSubmit: !!user.token,
      preLink: intPnum - 1 >= 1000 ? baseLink + (intPnum - 1) : '',
      afterLink: intPnum + 1 < 100000 ? baseLink + (intPnum + 1) : '',
      backUrl: '/problems',
      icon: id
    }
    return { detail, meta }
  } catch (e) {
    errorHandler(e, dispatch)
    return { error: true }
  }
}

@withInit(init)
class ProblemPage extends Component {
  state = {
    left: 14
  }

  changeLayout = () => {
    this.setState(state => {
      return {
        left: 24 - state.left
      }
    })
  }

  focusEdit = () => {
    this.setState({
      left: 10
    })
  }

  changeActiveKey = activeKey => {
    this.setState({ activeKey })
  }

  handleSubmit = async body => {
    const { match, dispatch } = this.props
    const id = match.params.id
    try {
      await this.changeActiveKey('submit')
      const { solutionId } = await submit(id, body)
      await this.setState({ solutionId })
    } catch (e) {
      errorHandler(e, dispatch)
    }
  }

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
    const { left = 14, solutionId = '', activeKey } = this.state
    const { detail = {}, meta = {}, error } = this.props

    const { canSubmit, preLink, afterLink } = meta

    if (error) {
      return (
        <Result
          style={{ marginTop: 80 }}
          type='error'
          title='题目获取失败'
          actions={
            <div>
              <Button onClick={() => window.location.reload()}>刷新重试</Button>
              <Button type='primary'>
                <Link to='/home'>返回首页</Link>
              </Button>
            </div>
          }
        />
      )
    }

    return (
      <Row type='flex' className='problem-page'>
        <Col xs={24} sm={left} className='left pl-10'>
          <ProblemDetail
            activeKey={activeKey}
            changeActiveKey={this.changeActiveKey}
            solutionId={solutionId}
            meta={meta}
            detail={detail}
          />
        </Col>
        <Col xs={24} sm={24 - left} className='right'>
          <div className='action hand' onClick={this.changeLayout}>
            <Icon type={left === 10 ? 'right' : 'left'} />
          </div>
          <ProblemEditor
            canSubmit={canSubmit}
            handleSubmit={this.handleSubmit}
            focusEdit={this.focusEdit}
            preLink={preLink}
            afterLink={afterLink}
            id={meta.id}
            baseLink={meta.baseLink}
            jumpCheck={getProblem}
          />
        </Col>
      </Row>
    )
  }
}

export default connect(({user}) => ({user}))(ProblemPage)
