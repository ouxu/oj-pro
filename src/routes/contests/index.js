import React, { PureComponent } from 'react'
import { Card, Input, Radio } from 'antd'
import qs from 'query-string'
import { connect } from 'dva'
import windowScroll from 'utils/scrollToAnchor'

const Search = Input.Search
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

@connect(({contests, user}) => ({contests, user}))
class Contests extends PureComponent {
  componentDidMount () {
    const {dispatch, location} = this.props
    const query = qs.parse(location.search)
    dispatch({type: 'contests/init', payload: query})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const {dispatch} = this.props
      const query = qs.parse(nextProps.location.search)
      dispatch({type: 'contests/init', payload: query})
      windowScroll('navigation')
    }
  }

  render () {
    const {contests = {}} = this.props
    console.log(contests)
    const extraContent = (
      <div className='flex-lol'>
        <RadioGroup defaultValue='all'>
          <RadioButton value='all'>全部</RadioButton>
          <RadioButton value='progress'>进行中</RadioButton>
          <RadioButton value='waiting'>等待中</RadioButton>
        </RadioGroup>
        <Search
          placeholder='竞赛名称'
          className='ml-10'
          style={{width: 200}}
          onSearch={() => ({})}
        />
      </div>
    )
    return (
      <Card
        bordered={false}
        title='竞赛&作业列表'
        className='m-16'
        bodyStyle={{padding: '0 32px 40px 32px'}}
        extra={extraContent}
      >
        12312
      </Card>
    )
  }
}

export default Contests
