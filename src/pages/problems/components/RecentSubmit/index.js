/**
 * Created by out_xu on 17/8/26.
 */
import React from 'react'
import { Table } from 'antd'
import Link from 'umi/link'
import TitleCard from 'components/plugins/TitleCard/index'
import { recordingColumn } from 'config/tableConfig'

const RecentSubmit = ({statusList}) => {
  const tableProps = {
    dataSource: statusList,
    showHeader: false,
    columns: recordingColumn,
    rowKey: 'id',
    size: 'small',
    pagination: false,
    rowClassName: (record, index) => (index % 2) ? 'color-row' : ''
  }
  return (
    <TitleCard header={(
      <span className='flex-lol'>
        <span>近期提交</span>
        <Link to='/status' className='white-text'>More</Link>
      </span>
    )}>
      <Table {...tableProps} />
    </TitleCard>
  )
}
export default RecentSubmit
