/**
 * Created by out_xu on 17/8/29.
 */
import React from 'react'
import { Card, Icon, message, Tooltip } from 'antd'
import copy from 'copy-to-clipboard'
import Markdown from 'components/Markdown'
const Simple = ({detail}) => {
  const style = {
    display: 'inline',
    background: '#d2eafc',
    lineHeight: 1.2
  }
  const onCopy = () => {
    copy(detail.sample_input)
    message.success('复制成功')
  }
  return (
    <div className='problem-description'>
      <h4>
        <span>样例输入</span>
        <Tooltip title='复制'>
          <Icon type='copy' onClick={onCopy} style={{marginLeft: 10}} />
        </Tooltip>
      </h4>
      <Card bodyStyle={{padding: 10}} className='keep-away'>
        <pre style={style}>
          {detail.sample_input}
        </pre>
      </Card>
      <h4>样例输出</h4>
      <Card bodyStyle={{padding: 10}} className='keep-away'>
        <pre style={style}>
          {detail.sample_output}
        </pre>
      </Card>
      {detail.hint && (
        <div>
          <h4>提示</h4>
          <Card bodyStyle={{padding: 10}} className='keep-away'>
            <Markdown content={detail.hint} />
          </Card>
        </div>
      )}
    </div>
  )
}

export default Simple
