import React, { Component } from 'react'
import PageHeader from './PageHeader/index'
import qs from 'query-string'
class Success extends Component {
  render () {
    const {contests = {}, contest = {}} = this.props
    const {contest_info: contestInfo = {}, problem_info: problemInfo = []} = contest
    const {contestsList: {page = '', size = '', keyword = ''}} = contests
    const contestsQuery = qs.stringify({page, size, keyword})
    return (
      <div className='contest-wrap'>
        <PageHeader contestsQuery={contestsQuery} contestInfo={contestInfo} />
      </div>
    )
  }
}

export default Success
