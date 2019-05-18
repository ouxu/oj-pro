/**
 * Created by out_xu on 17/8/28.
 */
import React from 'react'
import { Card, Tag } from 'antd'
import Markdown from 'components/plugins/Markdown/async'
import './index.less'
import { randomNumBoth } from 'utils/numberAbout'
import { colorArr } from 'utils/theme'

const Description = ({detail = {tags: []}, children}) => {
  return (
    <div className='problem-description'>
      <h3>题目描述</h3>
      <Card bodyStyle={{padding: 10}} style={{marginBottom: 10}} >
        <Markdown content={detail.description} />
      </Card>
      <h3>输入描述</h3>
      <Card bodyStyle={{padding: 10}} style={{marginBottom: 10}}>
        <Markdown content={detail.input} />
      </Card>
      <h3>输出描述</h3>
      <Card bodyStyle={{padding: 10}} style={{marginBottom: 10}}>
        <Markdown content={detail.output} />
      </Card>
      {children}
      {detail.tags.length > 0 && (
        <div className='mb-10'>
          <h3>标签</h3>
          {
            detail.tags > 0 && (detail.tags.map((value, index) => (
              <Tag color={colorArr[randomNumBoth(0, 5)]} key={index + 400}
                className='problem-title-tags'>{value.tag_title}
              </Tag>
            )))
          }
        </div>
      )}
      {detail.source && (
        <div className='mb-10'>
          <h3>来源</h3>
          <Tag color='purple'>{detail.source}</Tag>
        </div>
      )}
    </div>
  )
}

export default Description
