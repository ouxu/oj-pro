/**
 * Created by out_xu on 17/8/28.
 */
import React from 'react'
import { Tabs, Icon, Tooltip, Tag } from 'antd'
import Link from 'umi/link'
import Description from './Description'
import Sample from './Sample'
import Result from './Result'
import TweenOne from 'rc-tween-one'
import './index.less'
import { colorArr } from 'utils/theme'

const { TabPane } = Tabs

const ProblemDetail = props => {
  const { detail, solutionId = '', activeKey, changeActiveKey, meta } = props

  return (
    <TweenOne animation={[{ y: '30px', type: 'from' }]} reverseDelay={10} className='problem-detail' key={detail.id}>
      <div className='header d-flex'>
        <Link to={meta.backUrl || ''}> # </Link>
        <Tag style={{ marginLeft: 4, minWidth: 36, textAlign: 'center' }} color={colorArr['1']}>
          {meta.icon || detail.id || ''}
        </Tag>
        <span>{detail.title || ''}</span>
      </div>
      <div className='problem-detail-breadcrumb-detail'>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='创建人' placement='bottom'>
            <Icon type='edit' />
            <span>{detail.creator_name}</span>
          </Tooltip>
        </span>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='提交' placement='bottom'>
            <Icon type='exception' />
            <span>{detail.submit}</span>
          </Tooltip>
        </span>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='正确' placement='bottom'>
            <Icon type='check' />
            <span>{detail.accepted}</span>
          </Tooltip>
        </span>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='时间限制' placement='bottom'>
            <Icon type='clock-circle' />
            <span>{detail.time_limit} Sec</span>
          </Tooltip>
        </span>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='内存限制' placement='bottom'>
            <Icon type='save' />
            <span>{detail.memory_limit} MB</span>
          </Tooltip>
        </span>
      </div>
      <div className='content'>
        <Tabs activeKey={activeKey || 'description'} onChange={changeActiveKey}>
          <TabPane tab='描述' key='description'>
            <Description detail={detail}>
              <Sample detail={detail} />
            </Description>
          </TabPane>
          <TabPane tab='数据' key='data'>
            <Sample detail={detail} />
          </TabPane>
          <TabPane tab='评测' key='submit'>
            <Result solutionId={solutionId} />
          </TabPane>
        </Tabs>
      </div>
    </TweenOne>
  )
}

export default ProblemDetail
