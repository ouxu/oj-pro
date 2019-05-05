/**
 * Created by out_xu on 17/8/25.
 */
import React, { Component } from 'react'
import { Row, Col, Icon, Button } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'

import ProblemEditor from 'pages/problems/$id/components/ProblemEditor'
import ProblemDetail from 'pages/problems/$id/components/ProblemDetail'
import withInit from 'utils/withInit'
import { getProblem, submitContest } from 'pages/problems/$id/service'
import errorHandler from 'utils/errorHandler'
import Result from 'components/plugins/Result'

const init = async props => {
  const { meta = {}, dispatch } = props
  try {
    const detail = await getProblem(meta.pid)
    return { detail }
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
    const { meta = {}, dispatch } = this.props
    const { id, pnum } = meta

    try {
      await this.changeActiveKey('submit')
      const { solutionId } = await submitContest(id, pnum, body)
      await this.setState({ solutionId })
    } catch (e) {
      errorHandler(e, dispatch)
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
          />
        </Col>
      </Row>
    )
  }
}

export default connect(({user}) => ({user}))(ProblemPage)
