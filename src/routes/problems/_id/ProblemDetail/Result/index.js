/**
 * Created by out_xu on 17/9/20.
 */
import React from 'react'
import { Alert, Badge, Progress, Table } from 'antd'

const status = {
  '-1': '系统错误',
  '2': '编译错误',
  '3': '部分正确',
  '4': '正确',
  '0': '尚未提交'
}

const resultBadge = [
  <Badge status='error' text='答案错误' />,
  <Badge status='success' text='通过' />,
  <Badge status='warning' text='CPU时间超限' />,
  <Badge status='warning' text='运行时间超限' />,
  <Badge status='warning' text='内存超限' />,
  <Badge status='error' text='运行时错误' />,
  <Badge status='error' text='系统错误' />
]

const columnsP = [{
  title: '结果',
  width: '20%',
  render: record =>
    <span>
      {resultBadge[record.Result + 1]}
    </span>,
  className: 'status-result-code'
}, {
  title: '耗时',
  width: '40%',
  dataIndex: 'CpuTime',
  className: 'status—cpu-time'
}, {
  title: '内存',
  width: '40%',
  dataIndex: 'Memory',
  className: 'status-memory'
}]
const Result = ({result}) => {
  const {
    result_code: resultCode,
    result_data: resultData = {}
  } = result
  let {Passed = [], UnPassed = []} = resultData
  Passed = Passed === null ? [] : Passed
  UnPassed = UnPassed === null ? [] : UnPassed
  const percent = ~~(Passed.length / (Passed.length + UnPassed.length)) * 100
  const tableConfig = {
    bordered: false,
    size: 'small',
    pagination: false
  }
  return (
    <div className='problem-detail-result'>
      <div className='header'>
        <h4>{status[resultCode]}</h4>
        <Progress strokeWidth={4} percent={percent || 0} />
      </div>

      <br />
      {(resultCode === -1 || resultCode === 2) && (
        <div>
          <Alert
            message={'Error:'}
            description={resultData || ''}
          />
        </div>
      )}
      {(resultCode === 3 || resultCode === 4) && Passed.length > 0 && (
        <div style={{marginTop: 20}}>
          通过的数据：
          <Table
            {...tableConfig}
            columns={columnsP}
            dataSource={Passed}
            rowKey={(record, index) => 'Passed' + index}
          />
        </div>
      )}
      {(resultCode === 3 || resultCode === 4) && UnPassed.length > 0 && (
        <div style={{marginTop: 20}}>
          未通过的数据:
          <Table
            {...tableConfig}
            columns={columnsP}
            dataSource={UnPassed}
            rowKey={(record, index) => 'unPassed' + index}
          />
        </div>
      )}
    </div>
  )
}

export default Result
