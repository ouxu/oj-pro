import React from 'react'
import { connect } from 'dva'
import ErrorResult from '../../components/Error'
import Problem from './components/problem'
import { generateWord } from 'utils/numberAbout'

import withInit from 'utils/withInit'

const init = async props => {
  const { id } = props.match.params
  await props.dispatch({ type: 'contest/init', payload: id })
  return {}
}

const ContestSubmit = props => {
  const { contest = {}, user = {}, dispatch } = props
  const { id, pnum } = props.match.params
  const { error, errorMsg, errorCode } = contest

  if (error) {
    return <ErrorResult id={id} err={errorMsg} errCode={errorCode} dispatch={dispatch} />
  }

  const problemInfo = contest.problem_info || {}

  const problem = problemInfo.find(e => +e.pnum === +pnum) || {}
  const pid = problem.pid || ''

  const baseLink = '/contests/' + id + '/p/'
  const intPnum = Number(pnum)

  const meta = {
    id,
    pid,
    pnum,
    canSubmit: !!user.token,
    preLink: intPnum - 1 >= 0 ? baseLink + (intPnum - 1) : '',
    afterLink: intPnum + 1 < problemInfo.length ? baseLink + (intPnum + 1) : '',
    backUrl: '/contests/' + id,
    icon: generateWord(Number(pnum) + 1)
  }

  return <Problem meta={meta} dispatch={dispatch} />
}

export default connect(({ contest, user }) => ({ contest, user }))(withInit(init)(ContestSubmit))
