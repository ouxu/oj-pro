/**
 * Created by out_xu on 17/8/20.
 */
import React from 'react'
import { Collapse } from 'antd'
import TitleCard from 'components/TitleCard'
import Markdown from 'components/Markdown'

const Panel = Collapse.Panel

const NewsPanel = ({news}) => {
  const {latestNews = []} = news
  return (
    <TitleCard
      header={<span>公告板</span>}
    >
      <Collapse defaultActiveKey={latestNews.map(item => '' + item.id).slice(0, 1)}>
        {latestNews.map(item => (
          <Panel header={item.title} key={item.id}>
            <Markdown content={item.content} />
          </Panel>
        ))}
      </Collapse>
    </TitleCard>
  )
}

export default NewsPanel
