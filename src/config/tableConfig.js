/**
 * Created by out_xu on 17/8/25.
 */
import React from 'react'
import { Badge, Icon, Tag, Tooltip } from 'antd'
import { colorArr } from 'utils/theme'
import { randomNumBoth, generateWord } from 'utils/numberAbout'
import Link from 'umi/link'
import qs from 'query-string'
import Ellipsis from 'components/plugins/Ellipsis'
const difficultyArr = ['简单', '一般', '困难']

const langMap = [
  {
    key: '0',
    label: 'C'
  },
  {
    key: '1',
    label: 'C++'
  },
  {
    key: '2',
    label: 'Java'
  },

  {
    key: '3',
    label: 'Python 2.7'
  }
]

const resultMap = [
  {
    key: '-1',
    label: '系统错误'
  },
  {
    key: '2',
    label: '编译错误'
  },
  {
    key: '3',
    label: '部分通过'
  },
  {
    key: '4',
    label: '正确'
  },
  {
    key: '5',
    label: '运行错误'
  },
  {
    key: '6',
    label: '时间超限'
  },
  {
    key: '7',
    label: '内存超限'
  },
  {
    key: '8',
    label: '答案错误'
  }
]

const result = [
  <Badge status="error" text="系统错误" />,
  <Badge status="success" text="" />,
  <Badge status="error" text="" />,
  <Badge status="error" text="编译错误" />,
  <Badge status="warning" text="部分通过" />,
  <Badge status="success" text="正确" />,
  <Badge status="error" text="运行错误" />,
  <Badge status="error" text="时间超限" />,
  <Badge status="error" text="内存超限" />,
  <Badge status="error" text="答案错误" />
]
const language = ['C', 'C++', 'Java', 'Python', 'ruby', 'Shell', 'Pascal', 'php', 'perl']

const problemsColumn = [
  {
    dataIndex: 'user_status',
    title: '内容',
    render: (value, record) => {
      return (
        <div className="content flex-lol">
          <div className="d-inline-flex">
            <Tag color={colorArr[`${record.difficulty === 0 ? '1' : record.difficulty - 1}`]}>
              {difficultyArr[`${record.difficulty === 0 ? '1' : record.difficulty - 1}`]}
            </Tag>
            <Link style={{ color: '#666' }} to={'/problems/' + record.id}>
              <Ellipsis lines={1}>
                {record.id}. {record.title}
              </Ellipsis>
            </Link>
          </div>
          <span>
            <div className="item-detail">
              {record.tags.length > 0 && (
                <span>
                  {record.tags &&
                    record.tags.map((value, index) => (
                      <Tag color={colorArr[randomNumBoth(0, 5)]} key={index + 400} className="problem-title-tags">
                        {value.tag_title}
                      </Tag>
                    ))}
                </span>
              )}
              {record.source && (
                <Tooltip placement="top" title={record.source}>
                  <Icon type="environment" className="icon" />
                </Tooltip>
              )}
              {(() => {
                if (!value) {
                  return <Icon className="status-yes" style={{ color: 'transparent' }} type="check-circle" />
                } else if (value === 'Y') {
                  return <Icon className="status-yes" type="check-circle" />
                } else if (value === 'N') {
                  return <Icon className="status-no" type="close-circle" />
                }
              })()}
            </div>
            <Tooltip placement="top" title={record.accepted + ' / ' + record.submit}>
              <Tag color="blue" className="tag">
                {' '}
                {~~((100 * record.accepted) / record.submit)}%
              </Tag>
            </Tooltip>
          </span>
        </div>
      )
    }
  }
]

const contestProblemColumn = config => [
  {
    dataIndex: 'user_status',
    title: '内容',
    render: (value, record) => {
      return (
        <div className="content flex-lol">
          <div className="d-inline-flex">
            <Tag style={{ minWidth: 36, textAlign: 'center' }} color={colorArr['1']}>
              {generateWord(record.pnum + 1)}
            </Tag>
            <Link to={`/contests/${config.cid}/p/${record.pnum}`}>
              <Ellipsis lines={1}>
                {record.pid}. {record.title}
              </Ellipsis>
            </Link>
          </div>
          <span>
            <div className="item-detail">
              {record.tags && (
                <span>
                  {record.tags.length > 0 &&
                    record.tags.map((value, index) => (
                      <Tag color={colorArr[randomNumBoth(0, 5)]} key={index + 400} className="problem-title-tags">
                        {value.tag_title}
                      </Tag>
                    ))}
                </span>
              )}
              {record.source && (
                <Tooltip placement="top" title={record.source}>
                  <Icon type="environment" className="icon" />
                </Tooltip>
              )}
              {(() => {
                if (!value) {
                  return (
                    <Icon className="status-yes status-icon" style={{ color: 'transparent' }} type="check-circle" />
                  )
                } else if (value === 'Y') {
                  return <Icon className="status-yes status-icon" type="check-circle" />
                } else if (value === 'N') {
                  return <Icon className="status-no status-icon" type="close-circle" />
                }
              })()}
            </div>
            <Tooltip placement="top" title={record.accepted + '/' + record.submit}>
              <Tag color="blue" className="tag">
                {' '}
                {~~((100 * record.accepted) / record.submit)}%
              </Tag>
            </Tooltip>
          </span>
        </div>
      )
    }
  }
]

const recordingColumn = [
  {
    key: 'id',
    render: (record, dates, index) => (
      <div className="content flex-lol">
        <a
          style={{ color: '#666' }}
          target='_blank'
          href={`/problems/${record.problem_id}?${qs.stringify({
            solution: record.id,
            from: 'recent'
          })}`}
        >
          <Tag color={colorArr[record.language % 6]}>{language[record.language]}</Tag> # {`${record.problem_id}`}
        </a>
        <span>{result[record.result + 1]}</span>
      </div>
    )
  }
]

const statusColumns = [{
  title: '#',
  dataIndex: 'id',
  width: '80px',
  align: 'center'
}, {
  title: '问题',
  dataIndex: 'problem_id',
  render: value => <Link to={`/problems/${value}`}>{value}</Link>,
  width: '60px',
  align: 'center'
}, {
  title: '用户',
  dataIndex: 'name',
  render: value => <Ellipsis lines={1}>{value}</Ellipsis>,
  align: 'center'
}, {
  title: '用户ID',
  render: record => (
    <Link to={`/user/${record.user_id}`}>
      {record.user_id}
    </Link>
  ),
  key: 'user_id',
  width: '80px',
  align: 'center'
}, {
  title: '运行结果',
  dataIndex: 'result',
  render: value => result[value + 1],
  width: '100px',
  align: 'center'
}, {
  title: '通过率',
  dataIndex: 'pass_rate',
  render: value => ~~(value * 10000) / 100 + '%',
  width: '60px',
  align: 'center'
}, {
  title: '语言',
  render: (value, record)=> <a target='_blank' href={'/status/' + record.id}>{langMap[value.language].label}</a>,
  key: 'language',
  width: '100px',
  align: 'center'
}, {
  title: '代码长度',
  dataIndex: 'code_length',
  width: '80px',
  align: 'center'
}, {
  title: '提交时间',
  dataIndex: 'created_at',
  width: '180px',
  align: 'center'
}, {
  title: '操作',
  render: record => (
    <a
      target='_blank'
      href={`/problems/${record.problem_id}?${qs.stringify({
        solution: record.id,
        from: 'recent'
      })}`}
    >
      查看
    </a>
  ),
  key:'operate',
  width: '55px',
  align: 'center'
}]

export { problemsColumn, recordingColumn, contestProblemColumn, statusColumns, langMap, resultMap }
