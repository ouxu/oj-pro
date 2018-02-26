/**
 * Created by out_xu on 17/6/23.
 */
import React from 'react'
import PropType from 'prop-types'
import Markdown from 'react-markdown'
import './index.less'

const MarkdownArea = ({content = '', className = ''}) => {
  return (
    <div className={className}>
      <Markdown className='markdown-body' escapeHtml={false} source={content} />
    </div>
  )
}

MarkdownArea.propTypes = {
  content: PropType.string
}

export default MarkdownArea
