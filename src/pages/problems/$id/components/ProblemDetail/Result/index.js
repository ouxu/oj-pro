/**
 * Created by out_xu on 17/9/20.
 */
import React, { Component } from 'react'
import { Alert, Badge, Icon, Progress, Table } from 'antd'
import { queryResult } from 'pages/problems/$id/service'
import globalConfig from 'config/app'
import { randomNumBoth } from 'utils/numberAbout'

const shutUp = [-3, -1, 2, 3, 4, 5, 6, 7, 8]
const status = {
  '-1': '系统错误',
  '0': '尚未提交',
  '2': '编译错误',
  '3': '部分正确',
  '4': '正确',
  '5': '部分正确',
  '6': '部分正确',
  '7': '部分正确',
  '8': '答案错误'
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
    render: record => <span>{resultBadge[record.Result + 1]}</span>,
    width: 150,
    className: 'status-result-code'
  },
  {
    title: '耗时',
    dataIndex: 'CpuTime',
    className: 'status—cpu-time'
  },
  {
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
      loading: false,
      solutionId: this.props.solutionId
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.solutionId !== prevState.solutionId) {
      return {
        result_data: {},
        loading: true,
        result_code: 0,
        solutionId: nextProps.solutionId
      }
    }
    return null
  }

  getResult = solutionId => {
    queryResult(solutionId).then(data => this.setState({ ...data }))
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.loading) {
      if (!shutUp.includes(this.state.result_code)) {
        this.timer = setTimeout(() => this.getResult(this.state.solutionId), globalConfig.resultQueryTime)
      } else {
        clearTimeout(this.timer)
        this.setState({
          loading: false
        })
      }
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    const { result_data: resultData, result_code: resultCode = 0, loading } = this.state
    let { Passed = [], UnPassed = [] } = resultData
    Passed = Passed === null ? [] : Passed
    UnPassed = UnPassed === null ? [] : UnPassed
    const percent = ~~(Passed.length / (Passed.length + UnPassed.length) * 100)
    const tableConfig = {
      bordered: false,
      size: 'small',
      pagination: false
    }
    const progressProps = {
      status: loading ? 'active' : 'normal',
      strokeWidth: 4,
      style: { width: '98%' },
      percent: loading ? randomNumBoth(20, 40) : percent || 0
    }
    return (
      <div className='problem-detail-result' key={this.props.solutionId}>
        <div className='header'>
          <h4>
            {loading ? (
              <div>
                <Icon type='loading' />
                <span className='ml-5'>判题中</span>
              </div>
            ) : (
              status[resultCode]
            )}
          </h4>
          <Progress {...progressProps} />
        </div>
        {(resultCode === -1 || resultCode === 2) && (
          <div className='mt-16 mr-8'>
            <Alert type='error' message={'Error:'} description={resultData || ''} />
          </div>
        )}
        {(resultCode >= 3 && resultCode <=7 ) &&
          Passed.length > 0 && (
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
        {(resultCode >= 3 && resultCode <= 8) &&
          UnPassed.length > 0 && (
          <div className='mt-16'>
              未通过的数据:
            <Table
              {...tableConfig}
              columns={columnsP}
              dataSource={UnPassed}
              className='b-1'
              rowKey={(record, index) => 'unPassed' + index}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Result
