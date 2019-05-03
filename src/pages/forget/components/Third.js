import React from 'react'
import Result from 'components/plugins/Result'
import { Button } from 'antd'

import Link from 'umi/link'

export default props => {
  return (
    <Result
      className='pt-20'
      type='success'
      title='密码修改成功'
      actions={
        <div>
          <Button type='primary'>
            <Link to='/home'>返回首页</Link>
          </Button>
        </div>
      }
    />
  )
}
