import React from 'react'
import { Steps, Icon } from 'antd'
import Link from 'umi/link'

import First from './components/First'
import Second from './components/Second'
import Third from './components/Third'

const Step = Steps.Step

export default props => {
  const { step = 1 } = props.location.query || {}

  return (
    <div className='m-16 p-16 bg-white'>
      <div className='h-1'>找回密码</div>
      <div className='flex-lol mt-20'>
        <div style={{ flex: 1 }}>{props.children}</div>
        <div className='pt-20' style={{ width: 120 }}>
          <Steps direction='vertical' size='small' current={step - 1}>
            <Step title='验证' />
            <Step title='修改密码' />
            <Step title='Done' />
          </Steps>
        </div>
      </div>
    </div>
  )
}
