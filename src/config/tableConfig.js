/**
 * Created by out_xu on 17/8/25.
 */
import React from 'react'
import { Badge, Icon, Tag, Tooltip } from 'antd'
import { colorArr } from 'utils/theme'
import { randomNumBoth, generateWord } from 'utils/numberAbout'
import Link from 'umi/link'
import qs from 'query-string'

const difficultyArr = ['简单', '一般', '困难']

const result = [
  <Badge status='error' text='系统错误' />,
  <Badge status='success' text='' />,
  <Badge status='error' text='' />,
  <Badge status='error' text='编译错误' />,
  <Badge status='warning' text='部分通过' />,
  <Badge status='success' text='正确' />
]
const language = [
  'C',
  'C++',
  'Pascal',
  'Java',
  'ruby',
  'Shell',
  'Python',
  'php',
  'perl'
]

const problemsColumn = [{
  dataIndex: 'user_status',
  title: '内容',
  render: (value, record) => {
    return (
      <div className='content flex-lol'>
        <div>
          <Tag color={colorArr[`${record.difficulty === 0 ? '1' : record.difficulty - 1}`]}>
            {difficultyArr[`${record.difficulty === 0 ? '1' : record.difficulty - 1}`]}
          </Tag>
          <Link style={{color: '#666'}} to={'/problems/' + record.id}>{record.id}. {record.title}</Link>
        </div>
        <span>
          <div className='item-detail'>
            {record.tags.length > 0 && (
              <span>
                {
                  record.tags && (record.tags.map((value, index) => (
                    <Tag
                      color={colorArr[randomNumBoth(0, 5)]} key={index + 400}
                      className='problem-title-tags'
                    >
                      {value.tag_title}
                    </Tag>
                  )))}
              </span>
            )}
            {record.source && (
              <Tooltip placement='top' title={record.source}>
                <Icon type='environment' className='icon' />
              </Tooltip>
            )}
            {(() => {
              if (!value) {
                return <Icon className='status-yes' style={{color: 'transparent'}} type='check-circle' />
              } else if (value === 'Y') {
                return <Icon className='status-yes' type='check-circle' />
              } else if (value === 'N') {
                return <Icon className='status-no' type='close-circle' />
              }
            })()}
          </div>
          <Tooltip placement='top' title={record.accepted + ' / ' + record.submit}>
            <Tag color='blue' className='tag'> {~~(100 * record.accepted / record.submit)}%</Tag>
          </Tooltip>
        </span>
      </div>
    )
  }
}]

const contestProblemColumn = (config) => [{
  dataIndex: 'user_status',
  title: '内容',
  render: (value, record) => {
    return (
      <div className='content flex-lol'>
        <div>
          <Tag style={{minWidth: 36, textAlign: 'center'}} color={colorArr['1']}>
            {generateWord(record.pnum + 1)}
          </Tag>
          <Link style={{color: '#666'}} to={'/problems/' + record.pid + '?' + qs.stringify({
            from: 'contest',
            cid: config.cid,
            pnum: record.pnum
          })}>
             {record.pid}. {record.title}
          </Link>
        </div>
        <span>
          <div className='item-detail'>
            {record.tags && (
              <span>
                {
                  record.tags.length > 0 && (record.tags.map((value, index) => (
                    <Tag
                      color={colorArr[randomNumBoth(0, 5)]} key={index + 400}
                      className='problem-title-tags'
                    >
                      {value.tag_title}
                    </Tag>
                  )))}
              </span>
            )}
            {record.source && (
              <Tooltip placement='top' title={record.source}>
                <Icon type='environment' className='icon' />
              </Tooltip>
            )}

          </div>
          {(() => {
            if (!value) {
              return <Icon className='status-yes status-icon' style={{color: 'transparent'}} type='check-circle' />
            } else if (value === 'Y') {
              return <Icon className='status-yes status-icon' type='check-circle' />
            } else if (value === 'N') {
              return <Icon className='status-no status-icon' type='close-circle' />
            }
          })()}
          <Tooltip placement='top' title={record.accepted + '/' + record.submit}>
            <Tag color='blue' className='tag'> {~~(100 * record.accepted / record.submit)}%</Tag>
          </Tooltip>
        </span>
      </div>
    )
  }
}]

const recordingColumn = [{
  key: 'id',
  render: (record, dates, index) => (
    <div className='content flex-lol'>
      <Link style={{color: '#666'}} to={'/problems/' + record.problem_id + '?' + qs.stringify({
        solution: record.id,
        from: 'recent'
      })}>
        <Tag color={colorArr[record.language % 6]}>{language[record.language]}</Tag> # {`${record.problem_id}`}.
      </Link>
      <span>
        {result[record.result + 1]}
      </span>
    </div>
  )
}]

export { problemsColumn, recordingColumn, contestProblemColumn }
