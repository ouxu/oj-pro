import React from 'react'
import { Avatar, Row, Col } from 'antd'
import './index.less'

export default props => {
  const { userInfo = {} } = props

  const { name = '', signature, solved, submit } = userInfo

  const passrate = submit ? ((100 * solved) / submit).toFixed(2) : ''

  return (
    <Row type='flex' className='page-header'>
      <Col md={14} xs={24} className='mb-16'>
        <div className='flex-lol'>
          <Avatar icon='user' size={64} className='page-header-avatar' />
          <div className='ml-16 page-header-title'>
            <div className='page-header-username'>{name}</div>
            <div className='page-header-sign'>{signature}</div>
          </div>
        </div>
      </Col>
      <Col md={10} xs={24} className='mb-16'>
        <div className='page-header-meta'>
          <div className='page-header-item'>
            <p className='label'>提交</p>
            <p className='value'>{submit}</p>
          </div>
          <div className='page-header-item'>
            <p className='label'>解决</p>
            <p className='value'>{solved}</p>
          </div>
          <div className='page-header-item'>
            <p className='label'>正确率</p>
            <p className='value'>{passrate}%</p>
          </div>
        </div>
      </Col>
    </Row>
  )
}
