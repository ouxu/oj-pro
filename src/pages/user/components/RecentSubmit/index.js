import React, { Component } from 'react'
import { Button, Table } from 'antd'
import Link from 'umi/link'
import withInit from 'utils/withInit'
import errorHandler from 'utils/errorHandler'
import Result from 'components/plugins/Result'
import { recordingColumn } from 'config/tableConfig'
import qs from 'query-string'

import { getStatus } from '../../service'

const columns = [
  ...recordingColumn,
  {
    title: '操作',
    render: record => (
      <Link to={`/problems/${record.problem_id}?${qs.stringify({
        solution: record.id,
        from: 'recent'
      })}`}>
        查看提交
      </Link>
    ),
    key:'operate',
    width: '75px',
    align: 'center'
  },
  {
    title: '操作',
    render: record => (
      <Link to={'/status/' + record.id}>
        查看代码
      </Link>
    ),
    key:'code',
    width: '75px',
    align: 'center'
  }
]

const init = async props => {
  const { id = '' } = props
  const res = await getStatus({ user_id: id }).then(
    data => ({ data }),
    rej => {
      errorHandler(rej)
      return {
        error: true
      }
    }
  )
  return res
}

class RecentSubmit extends Component {
  render () {
    const { error = false, data = [], id } = this.props

    const tableProps = {
      dataSource: data,
      showHeader: false,
      columns: columns,
      rowKey: 'id',
      size: 'small',
      pagination: false,
      rowClassName: (record, index) => (index % 2) ? 'color-row' : ''
    }
    return (
      <div>
        <div className='mb-16 mx-8 flex-lol' style={{ alignItems: 'baseline' }}>
          <span className='h-user'>近期提交</span>
          <Link to={ '/status?user_id=' + id }>查看更多</Link>
        </div>
        <Table {...tableProps} />
      </div>
    )
  }
}

export default withInit(init)(RecentSubmit)
