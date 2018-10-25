import React, { Component } from 'react'
import Link from 'umi/link'
import Process from './Process'
import Markdown from 'components/plugins/Markdown/async'
import './index.less'

class PageHeader extends Component {
  render () {
    const {contestInfo = {}} = this.props
    const {id = '', title = '', description = ''} = contestInfo
    return (
      <div className='page-header'>
        <h1 className='page-header-title my-8'>
          <Link to='/contests'>
            <span> # Contest-</span>
          </Link>
          {id}
          <span className='page-header-title-sub'>{title}</span>
        </h1>
        <Process contestInfo={contestInfo} />
        {description.length > 0 && (
          <Markdown content={description} className='page-header-description' />
        )}
      </div>
    )
  }
}

export default PageHeader
