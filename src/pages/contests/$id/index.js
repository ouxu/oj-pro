import React from 'react'
import { connect } from 'dva'

import ErrorResult from './components/Error'
import SuccessResult from './components/Success'
import withInit from 'utils/withInit'

const init = async props => {
  const { id } = props.match.params
  await props.dispatch({ type: 'contest/init', payload: id })
  return {}
}

const ContestDetail = props => {
  const { contest, dispatch } = props
  const { id } = props.match.params
  const { error, errorMsg, errorCode } = contest

  return (
    <div>
      {error ? (
        <ErrorResult id={id} err={errorMsg} errCode={errorCode} dispatch={dispatch} />
      ) : (
        <SuccessResult id={id} {...props} />
      )}
    </div>
  )
}

export default connect(({ contest }) => ({ contest }))(withInit(init)(ContestDetail))
