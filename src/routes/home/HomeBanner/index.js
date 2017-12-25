/**
 * Created by out_xu on 17/8/20.
 */

import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim'
import { Button } from 'antd'
import TweenOne from 'rc-tween-one'
import 'rc-banner-anim/assets/index.css'
import config from './config'
import { color } from 'utils/theme'
import './index.less'

const BgElement = Element.BgElement
const colorArr = [
  '#364D79',
  '#64CBCC',
  color.red,
  color.peach,
  color.blue
]

const itemRender = (item, index) => {
  return (
    <Element
      prefixCls='banner-home-elem'
      key={index}
    >
      <BgElement
        key='bg'
        className='bg'
        style={{
          background: colorArr[index % 5]
        }}
      />
      <TweenOne className='banner-home-title' animation={{y: 30, opacity: 0, type: 'from'}}>
        {item.title}
      </TweenOne>
      <TweenOne className='banner-home-text'
        animation={{y: 30, opacity: 0, type: 'from', delay: 100}}
      >
        {item.text}
        <br />
        <br />
        {item.btn && (
          <Button size='small' type='dashed' ghost><a target='_blank' href={item.href}>{item.btn}</a></Button>
        )}
      </TweenOne>
    </Element>
  )
}
const HomeBanner = () => (
  <BannerAnim prefixCls='banner-home' autoPlay>
    {config.map((item, index) => itemRender(item, index))}
  </BannerAnim>
)
export default HomeBanner
