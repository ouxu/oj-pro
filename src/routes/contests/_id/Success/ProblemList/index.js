import React, { Component } from 'react'
import { Table } from 'antd'
import { contestProblemColumn } from 'config/tableConfig'
import './index.less'

class ProblemList extends Component {
  render () {
    const {dispatch, problemInfo = [], id} = this.props
    const tableProps = {
      pagination: false,
      dataSource: problemInfo,
      showHeader: false,
      columns: contestProblemColumn({cid: id}),
      rowKey: 'pnum',
      size: 'small',
      onRow: (record, index) => ({
        onClick: () => dispatch({type: 'problems/update', payload: {selectProblem: record}})
      })
    }
    return (
      <div className='contest-item'>
        <Table {...tableProps} />
      </div>
    )
  }
}

export default ProblemList
