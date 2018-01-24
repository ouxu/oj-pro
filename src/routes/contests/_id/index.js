import React, { PureComponent } from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'

import ErrorResult from './Error'
import SuccessResult from './Success'

@connect(({contest, contests}) => ({contest, contests}))
class ContestDetail extends PureComponent {

  componentDidMount () {
    const {id} = this.props.match.params
    this.props.dispatch({type: 'contest/init', payload: id})
  }

  render () {
    const {contest, dispatch, contests} = this.props
    const {id} = this.props.match.params
    const {error, errorMsg, errorCode} = contest
    return (
      <div>
        {error ? (
          <ErrorResult id={id} err={errorMsg} errCode={errorCode} dispatch={dispatch} />
        ) : (
          <SuccessResult id={id} {...this.props} />
        )}
      </div>
    )
  }
}

export default ContestDetail
