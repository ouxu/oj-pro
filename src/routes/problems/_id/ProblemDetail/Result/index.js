/**
 * Created by out_xu on 17/9/20.
 */
import React, { Component } from 'react'
import { Alert, Badge, Icon, Progress, Table } from 'antd'
import { queryResult } from '../../service'
import globalConfig from 'config/app'

const shutUp = [-3, -1, 2, 3, 4]
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

const columnsP = [
  {
    title: '结果',
    key: 'result',
    render: record => (
      <span>
        {resultBadge[record.Result + 1]}
      </span>
    ),
    width: 150,
    className: 'status-result-code'
  }, {
    title: '耗时',
    dataIndex: 'CpuTime',
    className: 'status—cpu-time'
  }, {
    title: '内存',
    dataIndex: 'Memory',
    width: 150,
    className: 'status-memory'
  }
]

class Result extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result_data: {},
      result_code: 0,
      loading: false
    }
  }

  getResult = async (solutionId) => {
    const data = await queryResult(solutionId)
    this.setState({...data})
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.solutionId !== this.props.solutionId) {
      this.setState({
        result_data: {},
        loading: true,
        result_code: 0
      })
    }
  }

  componentWillUpdate (nextProps, nextState, nextContext) {
    if (nextState.loading) {
      if (!shutUp.includes(nextState.result_code)) {
        setTimeout(() => this.getResult(nextProps.solutionId), globalConfig.resultQueryTime)
        return false
      } else {
        this.setState({
          loading: false
        })
      }
    }
    return true
  }

  render () {
    const {result_data: resultData, result_code: resultCode = 0, loading} = this.state
    let {Passed = [], UnPassed = []} = resultData
    Passed = Passed === null ? [] : Passed
    UnPassed = UnPassed === null ? [] : UnPassed
    const percent = ~~(Passed.length / (Passed.length + UnPassed.length)) * 100
    const tableConfig = {
      bordered: false,
      size: 'small',
      pagination: false
    }
    const progressProps = {
      status: loading ? 'active' : 'normal',
      strokeWidth: 4,
      style: {width: '98%'},
      percent: loading ? 30 : (percent || 0)
    }
    return (
      <div className='problem-detail-result' key={this.props.solutionId}>
        <div className='header'>
          <h4>
            {loading ? (
              <div><Icon type='loading' /><span className='ml-5'>判题中</span></div>
            ) : status[resultCode]}
          </h4>
          <Progress {...progressProps} />
        </div>
        {(resultCode === -1 || resultCode === 2) && (
          <div className='mt-16 mr-8'>
            <Alert
              type='error'
              message={'Error:'}
              description={resultData || ''}
            />
          </div>
        )}
        {(resultCode === 3 || resultCode === 4) && Passed.length > 0 && (
          <div className='mt-16'>
          通过的数据：
          <Table
            {...tableConfig}
            columns={columnsP}
            dataSource={Passed}
            className='b-1'
            rowKey={(record, index) => 'Passed' + index}
          />
          </div>
        )}
        {(resultCode === 3 || resultCode === 4) && UnPassed.length > 0 && (
          <div className='mt-16'>
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
}

export default Result
