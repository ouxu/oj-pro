/**
 * Created by out_xu on 17/8/20.
 */
import React from 'react'
import { routerRedux } from 'dva/router'
import { Button, Icon, Input, Table } from 'antd'
import { problemsColumn } from 'config/tableConfig'
import qs from 'query-string'
import { randomNumBoth } from 'utils/numberAbout'
import './index.less'

const {Search} = Input

const ProblemTable = ({problemsList, loading, dispatch, location}) => {
  const {count, data = []} = problemsList
  const {pathname, query} = location
  const {page, size} = query
  const pagination = {
    pageSize: +size || 50,
    current: +page || 1,
    total: count,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(pathname + '?' + qs.stringify({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(pathname + '?' + qs.stringify({...query, page: current})))
    }
  }
  const rowClassName = (record, index) => (index % 2) ? 'color-row' : ''
  const tableProps = {
    loading,
    pagination,
    dataSource: data,
    showHeader: false,
    columns: problemsColumn,
    rowKey: 'id',
    size: 'small',
    onRow: (record, index) => ({
      onClick: () => dispatch({type: 'problems/update', payload: {selectProblem: record}})
    }),
    rowClassName
  }
  const onSearch = (value) => {
    dispatch(routerRedux.push(pathname + '?' + qs.stringify({keyword: value})))
  }
  return (
    <div className='problems-item'>
      <div className='p-8 flex-lol border-bottom' key='header'>
        <Search
          defaultValue={query.keyword}
          style={{width: 240}}
          placeholder='题号/标题/作者/标签'
          onSearch={onSearch}
        />
        <Button type='danger' onClick={() => dispatch(routerRedux.push('/problems/' + randomNumBoth(1000, 1888)))}>
          <Icon type='rocket' />帮我挑一题
        </Button>
      </div>

      <div className='table' key='table'>
        <Table {...tableProps} />
      </div>
    </div>
  )
}

export default ProblemTable
