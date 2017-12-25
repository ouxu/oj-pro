/**
 * Created by out_xu on 17/8/25.
 */
import React from 'react'
import { List, Tag } from 'antd'

import {colorArr} from 'utils/theme'
import TitleCard from 'components/TitleCard'
// import './index.less'

const UserStatus = (props) => {
  const listItemStyle = {
    width: '100%'
  }
  const tableProps = {
    dataSource: [{
      label: '提交',
      value: 1231
    }, {
      label: '正确',
      value: 123
    }, {
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
      header={<span>提交状态</span>}
    >
      <div>
        <List {...tableProps} />
      </div>
    </TitleCard>
  )
}

export default UserStatus
