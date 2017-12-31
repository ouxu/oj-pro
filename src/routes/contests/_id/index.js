import React, { Component } from 'react'
import { connect } from 'dva'
import ErrorResult from './Error'
import SuccessResult from './Success'

@connect(({contest, contests}) => ({contest, contests}))
class ContestDetail extends Component {
  componentDidMount () {
    const {id} = this.props.match.params
    this.props.dispatch({type: 'contest/init', payload: id})
  }

  render () {
    const {contest, dispatch, contests} = this.props
    const {id} = this.props.match.params
    const {error, errorMsg, errorCode} = contest
    if (error) {
      return (
        <ErrorResult id={id} err={errorMsg} errCode={errorCode} dispatch={dispatch} />
      )
    }
    return (
      <SuccessResult {...this.props} />
    )
  }
}

export default ContestDetail