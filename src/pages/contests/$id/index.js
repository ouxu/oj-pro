import React, { PureComponent } from 'react'
import { connect } from 'dva'

import ErrorResult from './components/Error'
import SuccessResult from './components/Success'

@connect(({contest}) => ({contest}))
class ContestDetail extends PureComponent {
  componentDidMount () {
    const {id} = this.props.match.params
    this.props.dispatch({type: 'contest/init', payload: id})
  }

  render () {
    const {contest, dispatch} = this.props
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
