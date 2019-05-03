import React from 'react'

import First from './components/First'
import Second from './components/Second'
import Third from './components/Third'

export default props => {
  const { step = 1 } = props.location.query || {}
  const child = [<First />, <Second />, <Third />]
  return child[step - 1]
}
