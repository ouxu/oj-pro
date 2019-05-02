/**
 * Created by out_xu on 17/8/20.
 */
import React from 'react'
import TitleCard from 'components/plugins/TitleCard'
import Markdown from 'components/plugins/Markdown/async'

const NewsPanel = ({ news }) => {
  const { latestNews = [] } = news
  const fixedNews = latestNews.slice(0, 1).pop() || {}
  return (
    <TitleCard header={<span>公告板</span>}>
      <Markdown content={fixedNews.content} className='m-8' />
    </TitleCard>
  )
}

export default NewsPanel
