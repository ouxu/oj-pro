/**
 * Created by out_xu on 17/8/20.
 */

import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim'
import { Button } from 'antd'
import TweenOne from 'rc-tween-one'
import Link from 'umi/link'
import Ellipsis from 'components/plugins/Ellipsis'

import 'rc-banner-anim/assets/index.css'
import { color } from 'utils/theme'
import clearRichText from 'utils/clearRichText'

import './index.less'

const BgElement = Element.BgElement
const colorArr = ['#364D79', '#64CBCC', color.red, color.peach, color.blue]

const itemRender = (item, index) => {
  return (
    <Element prefixCls='banner-home-elem' key={index}>
      <BgElement
        key='bg'
        className='bg'
        style={{
          background: colorArr[index % 5]
        }}
      />
      <TweenOne className='banner-home-title' animation={{ y: 30, opacity: 0, type: 'from' }}>
        {item.title}
      </TweenOne>
      <TweenOne className='banner-home-text' animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}>
        <Ellipsis lines={2}>{clearRichText(item.content)}</Ellipsis>
        <br />
        {item.btn ? (
          <Button size='small' type='dashed' ghost>
            <a target='_blank' href={item.href}>
              {item.btn}
            </a>
          </Button>
        ) : (
          <Button size='small' type='dashed' ghost>
            <Link to={`news?id=${item.id}`}>了解更多</Link>
          </Button>
        )}
      </TweenOne>
    </Element>
  )
}
const HomeBanner = ({ news = {} }) => {
  const latestNews = (news.latestNews || []).slice()

  latestNews.unshift({
    title: '全新 NEUQ OJ 2.0 上线测试',
    btn: '反馈问题',
    content: 'The Fast The Beautiful. 使用过程中有任何体验问题或者 BUG 欢迎反馈！',
    href: 'https://github.com/ouxu/oj-pro/issues'
  })
  return (
    <BannerAnim prefixCls='banner-home' autoPlay>
      {latestNews.map((item, index) => itemRender(item, index))}
    </BannerAnim>
  )
}
export default HomeBanner
