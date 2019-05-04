import React from 'react'
import { Steps } from 'antd'

import First from './components/First'
import Second from './components/Second'
import Third from './components/Third'

const Step = Steps.Step

export default props => {
  const { step = 1 } = props.location.query || {}
  const child = [<First />, <Second />, <Third />]

  return (
    <div className='m-16 p-16 bg-white'>
      <div className='flex-lol'>
        <div className='h-1'>注册账号</div>
        {/* <Link className='pt-10' to='/register/active'>
          <Icon type='info-circle-o' /> 已有账号，点此激活
        </Link> */}
      </div>
      <div className='flex-lol mt-20'>
        <div style={{ flex: 1 }}>{child[step - 1]}</div>
        <div className='pt-20' style={{ width: 120 }}>
          <Steps direction='vertical' size='small' current={step - 1}>
            <Step title='注册' />
            <Step title='激活' />
            <Step title='Done' />
          </Steps>
        </div>
      </div>
    </div>
  )
}
