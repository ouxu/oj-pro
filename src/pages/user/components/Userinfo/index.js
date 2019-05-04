import React from 'react'
import { List } from 'antd'

const infoOrder = ['id', 'school', 'email', 'mobile']

const infoTitle = {
  id: '用户ID',
  school: '学校',
  email: '电子邮箱',
  mobile: '手机号码'
}

const formarInfo = (user = {}) => {
  const data = []
  infoOrder.forEach(i => {
    data.push({ title: infoTitle[i], value: user[i] || '暂无' })
  })

  return data
}

export default props => {
  const { user } = props
  return (
    <div>
      <div className='h-user'>
        用户信息
      </div>
      <List
        itemLayout='horizontal'
        dataSource={formarInfo(user)}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.value} />
          </List.Item>
        )}
      />
    </div>
  )
}
