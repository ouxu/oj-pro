/**
 * Created by out_xu on 17/8/25.
 */
import React from 'react'
import { Badge, Icon, Tag, Tooltip } from 'antd'
import { colorArr } from 'utils/theme'
import { randomNumBoth } from 'utils/numberAbout'
import { Link } from 'dva/router'

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
              <Tooltip placement='bottom' title={record.source}>
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
          <Tag color='blue' className='tag'> {~~(100 * record.accepted / record.submit)}%</Tag>
        </span>
      </div>
    )
  }
}]
const recordingColumn = [{
  key: 'id',
  render: (record, dates, index) => (
    <div className='content flex-lol'>
      <Link style={{color: '#666'}} to={'/problems/' + record.problem_id}>
        <Tag color={colorArr[record.language % 6]}>{language[record.language]}</Tag> # {`${record.problem_id}`}.
      </Link>
      <span>
        {result[record.result + 1]}
      </span>
    </div>
  )
}]

export { problemsColumn, recordingColumn }
