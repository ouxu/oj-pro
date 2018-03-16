/**
 * Created by out_xu on 17/8/28.
 */
import React from 'react'
import { Tabs, Popover, Icon, List } from 'antd'
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
  return (
    <TweenOne
      animation={[{y: '30px', type: 'from'}]}
      reverseDelay={10}
      className='problem-detail'
      key={detail.id}
    >
      <h2 className='header'>
        <Link to='/problems'> # </Link>
        <Popover
          content={content}
          placement='rightTop'
          title={<Link to={query.cid ? ('/contests/' + query.cid) : '/problems'}><Icon type='left' /> 返回题目列表</Link>}
        >
          <span>{`${detail.id}. ${detail.title}`}</span>
        </Popover>
      </h2>
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
