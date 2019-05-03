import React, { Component } from 'react'
import { Button } from 'antd'
import Link from 'umi/link'
import Process from './Process'
import Markdown from 'components/plugins/Markdown/async'
import './index.less'

class PageHeader extends Component {
  render () {
    const { contestInfo = {}, showDesc = true, pathname = '' } = this.props
    const { id = '', title = '', description = '' } = contestInfo
    return (
      <div className='page-header'>
        <div className='page-header-title my-8 flex-lol'>
          <div>
            <Link to='/contests'>
              <span> # Contest-</span>
            </Link>
            {id}
            <span className='page-header-title-sub'>{title}</span>
          </div>
          <a target='_blank' href={pathname + '/fullrank'}>
            <Button className='mt-4' type='primary' icon='line-chart'>
              排行榜
            </Button>
          </a>
        </div>
        <Process contestInfo={contestInfo} />
        {showDesc && description.length > 0 && <Markdown content={description} className='page-header-description' />}
      </div>
    )
  }
}

export default PageHeader
