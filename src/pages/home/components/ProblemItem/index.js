/**
 * Created by out_xu on 17/8/20.
 */
import React from 'react'
import { Button, Icon, Table } from 'antd'
import './index.less'
import { problemsColumn } from 'config/tableConfig'
import { routerRedux } from 'dva/router'
import { randomNumBoth } from 'utils/numberAbout'

const ProblemItem = ({hotProblems, loading, dispatch}) => {
  const {page, size, count, data = []} = hotProblems

  const tableProps = {
    dataSource: data,
    showHeader: false,
    columns: problemsColumn,
    rowKey: 'id',
    size: 'small',
    pagination: false,
    rowClassName: (record, index) => (index % 2) ? 'color-row' : '',
    footer: (data) => (
      <a
        className='flex-center table-footer' disabled={data.length === count}
        onClick={() => dispatch({type: 'home/getHotProblems', payload: {page: page + 1, size, count, data}})}
      >
        {data.length === count ? (
          <span><Icon type='smile-o' /> 加载完毕</span>
        ) : (
          <span>{loading && <Icon type='loading' />} 加载更多</span>
        )}
      </a>
    )
  }

  return (
    <div className='home-problem-item'>
      <div className='p-8 flex-lol border-bottom' key='header'>
        <span>
          🔥 热门题目
        </span>
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

export default ProblemItem
