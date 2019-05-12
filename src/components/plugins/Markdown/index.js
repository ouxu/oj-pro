/**
 * Created by out_xu on 17/6/23.
 */
import React from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'
import kt from 'katex'
import texmath from 'markdown-it-texmath'
import markdownit from 'markdown-it'
import Markdown from 'react-markdown'
import 'katex/dist/katex.css'
import './index.less'

const MarkdownArea = ({ content = '', className }) => {
  content = !!content ? content : ''
  return (
    <div className={classnames('markdown-body', className)}>
      <Markdown
        source={markdownit({
          html: true,
          linkify: true,
          typographer: true
        })
          .use(texmath.use(kt))
          .render(content)}
      />
    </div>
  )
}

MarkdownArea.propTypes = {
  content: PropType.string
}

export default MarkdownArea
