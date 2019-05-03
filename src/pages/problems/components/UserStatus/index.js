/**
 * Created by out_xu on 17/8/25.
 */
import React from 'react'
import { List, Tag } from 'antd'
import { connect } from 'dva'

import { colorArr } from 'utils/theme'
import TitleCard from 'components/plugins/TitleCard'

const UserStatus = props => {
  const { home = {}, user = {} } = props
  const submits = home.submits || {}
  const userStatus = user.user || {}

  console.log('submits: ', submits)

  console.log('userStatus: ', userStatus)

  const listItemStyle = {
    width: '100%'
  }
  const tableProps = {
    dataSource: [
      {
        label: '提交',
        value: userStatus.submit
      },
      {
        label: '正确',
        value: userStatus.solved
      },
      {
        label: '今日提交',
        value: submits.day
      },
      {
        label: '本周提交',
        value: submits.week
      },
      {
        label: '本月提交',
        value: submits.month
      }
    ],
    size: 'small',
    renderItem (item, index) {
      return (
        <List.Item>
          <div className='flex-lol ml-10 my-2' style={listItemStyle}>
            <Tag color={colorArr[index % 6]}>{item.label}</Tag>
            {item.value && (
              <Tag color='blue' style={{ borderRadius: 10 }}>
                {item.value}
              </Tag>
            )}
          </div>
        </List.Item>
      )
    }
  }
  return (
    <TitleCard header={<span>提交状态</span>}>
      <div>
        <List {...tableProps} />
      </div>
    </TitleCard>
  )
}

export default connect(({ user, home = {} }) => ({ user, home }))(UserStatus)
