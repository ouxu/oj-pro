/**
 * Created by out_xu on 17/8/26.
 */
import React from 'react'
import PropType from 'prop-types'
import { Card } from 'antd'
import './index.less'
const TitleCard = ({cardStyle, headerClass, contentClass, children, header}) => {
  const cardBodyStyle = {padding: 0}
  headerClass = 'header' + (headerClass ? (' ' + headerClass) : '')
  contentClass = 'content' + (contentClass ? (' ' + contentClass) : '')
  return (
    <Card bodyStyle={cardBodyStyle} className='clearfix title-panel'
      style={cardStyle}
    >
      <div className={headerClass}>
        {header}
      </div>
      <div className={contentClass}>
        {children}
      </div>
    </Card>
  )
}

TitleCard.propTypes = {
  cardStyle: PropType.object,
  headerClass: PropType.string,
  contentClass: PropType.string,
  children: PropType.element,
  header: PropType.element
}
TitleCard.defaultProps = {}

export default TitleCard
