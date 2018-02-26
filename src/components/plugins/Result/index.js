import React from 'react'
import { Icon } from 'antd'
import './index.less'

const Result = ({className, type, title, description, extra, actions, ...restProps}) => {
  const iconMap = {
    error: <Icon className='error' type='close-circle' />,
    success: <Icon className='success' type='check-circle' />
  }
  const _className = [className, 'result']
  return (
    <div className={_className.join(' ')} {...restProps}>
      <div className='icon'>{iconMap[type]}</div>
      <div className='title'>{title}</div>
      {description && <div className='description'>{description}</div>}
      {extra && <div className='extra'>{extra}</div>}
      {actions && <div className='actions'>{actions}</div>}
    </div>
  )
}
export default Result
