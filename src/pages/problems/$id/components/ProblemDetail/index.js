/**
 * Created by out_xu on 17/8/28.
 */
import React from 'react'
import { Tabs, Popover, Icon, List, Tooltip } from 'antd'
import Link from 'umi/link'
import Description from './Description'
import Simple from './Simple'
import Result from './Result'
import TweenOne from 'rc-tween-one'
import qs from 'query-string'
import './index.less'

const {TabPane} = Tabs

const ProblemDetail = (props) => {
  const {activeKey, dispatch, detail, solutionId, problemsList, contest, location} = props
  const {query = {}} = location
  const relatedProblems = (query.cid) ? (
    contest.problem_info
  ) : (
    problemsList.data.filter(e => Math.abs(e.id - detail.id) <= 5)
  )

  const content = (
    <List
      size='small'
      dataSource={relatedProblems}
      renderItem={record => {
        let link = '/problems/'
        if (query.cid) {
          link = link + record.pid + '?' + qs.stringify({
            ...query,
            pnum: record.pnum
          })
        } else {
          link = link + record.id
        }
        return (
          <List.Item>
            <Link style={{color: '#666'}} to={link}> # {record.id}. {record.title} </Link>
          </List.Item>
        )
      }}
    />
  )
  const backLink = query.cid ? ('/contests/' + query.cid) : '/problems'
  return (
    <TweenOne
      animation={[{y: '30px', type: 'from'}]}
      reverseDelay={10}
      className='problem-detail'
      key={detail.id}
    >
      <h2 className='header'>
        <Link to={backLink}> # </Link>
        <Popover
          content={content}
          placement='rightTop'
          title={<Link to={backLink}><Icon type='left' /> 返回题目列表</Link>}
        >
          <span>{`${detail.id}. ${detail.title}`}</span>
        </Popover>
      </h2>
      <div className='problem-detail-breadcrumb-detail'>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='创建人' placement='bottom'>
            <Icon type='edit' /><span>{detail.creator_name}</span>
          </Tooltip>
        </span>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='提交' placement='bottom'>
            <Icon type='exception' /><span>{detail.submit}</span>
          </Tooltip>
        </span>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='正确' placement='bottom'>
            <Icon type='check' /><span>{detail.accepted}</span>
          </Tooltip>
        </span>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='时间限制' placement='bottom'>
            <Icon type='clock-circle' /><span>{detail.time_limit} Sec</span>
          </Tooltip>
        </span>
        <span className='problem-detail-breadcrumb-detail-tags'>
          <Tooltip title='内存限制' placement='bottom'>
            <Icon type='save' /><span>{detail.memory_limit} MB</span>
          </Tooltip>
        </span>
      </div>
      <div className='content'>
        <Tabs
          activeKey={activeKey}
          onChange={activeKey => dispatch({type: 'problem/update', payload: {activeKey}})}
        >
          <TabPane tab='描述' key='description'>
            <Description detail={detail} />
          </TabPane>
          <TabPane tab='数据' key='data'>
            <Simple detail={detail} />
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
