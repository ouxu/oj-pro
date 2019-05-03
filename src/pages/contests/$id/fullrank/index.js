import React from 'react'
import { connect } from 'dva'

import ErrorResult from '../components/Error'
import RankList from '../components/RankList'
import withInit from 'utils/withInit'

const init = async props => {
  const { id } = props.match.params
  await props.dispatch({ type: 'contest/init', payload: id })
  return {}
}

const Rank = props => {
  const { contest = {}, dispatch } = props
  const { id } = props.match.params
  const { problem_info: problemInfo = [], contest_info: contestInfo = {}, error, errorMsg, errorCode } = contest
  if (error) {
    return <ErrorResult id={id} err={errorMsg} errCode={errorCode} dispatch={dispatch} />
  }
  return <RankList countNum={problemInfo.length} endTime={contestInfo.end_time} contestInfo={contestInfo} id={id} />
}

export default connect(({ contest }) => ({ contest }))(withInit(init)(Rank))
