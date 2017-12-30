/**
 * Created by out_xu on 17/8/28.
 */
import React from 'react'
import { Tabs } from 'antd'
import { Link } from 'dva/router'
import Description from './Description'
import Simple from './Simple'
import Result from './Result'
import qs from 'query-string'
import './index.less'
import TweenOne from 'rc-tween-one'

const {TabPane} = Tabs

const ProblemDetail = ({activeKey, dispatch, detail, solutionId, problemsList}) => {
  const {page, size, keyword} = problemsList

  return (
    <TweenOne
      animation={[{y: '30px', type: 'from'}]}
      reverseDelay={10}
      className='problem-detail'
    >
      <h2 className='header'>
        <Link to={'/problems?' + qs.stringify({page, size, keyword})}>#</Link>{` ${detail.id}. ${detail.title}`}
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
