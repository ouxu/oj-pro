/**
 * Created by out_xu on 17/8/22.
 */

import React from 'react'
import { List, Tag } from 'antd'
import { colorArr } from 'utils/theme'
import TitleCard from 'components/TitleCard'

const StatusPanel = () => {
  const listItemStyle = {
    width: '100%'
  }
  const tableProps = {
    dataSource: [{
      label: '今日提交',
      value: 123
    }, {
      label: '本周提交',
      value: 123
    }, {
      label: '本月提交',
      value: 123
    }],
    size: 'small',
    renderItem (item, index) {
      return (
        <List.Item>
          <div className='flex-lol ml-10 my-2' style={listItemStyle}>
            <Tag color={colorArr[index % 6]}>{item.label}</Tag>
            <Tag color='blue' style={{borderRadius: 10}}>{item.value}</Tag>
          </div>
        </List.Item>
      )
    }
  }
  return (
    <TitleCard
      cardStyle={{height: 170, overflow: 'hidden'}}
      header={<span>状态面板</span>} m nbzxc
    >
      <List {...tableProps} />
    </TitleCard>
  )
}

export default StatusPanel
