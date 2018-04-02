import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import { color } from 'utils/theme'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './index.less'
const HomeChart = ({chartData}) => {
  return (
    <div className='sales'>
      <div className='title'><Icon type='clock-circle-o' /> 近期提交</div>
      <ResponsiveContainer minHeight={360}>
        <AreaChart data={chartData}>
          <Legend verticalAlign='top'
            content={prop => {
              const {payload} = prop
              return (<ul className='legend clearfix'>
                {payload.map((item, key) => <li key={key}><span className='radiusdot'
                  style={{background: item.color}} />{item.value}</li>)}
              </ul>)
            }}
          />
          <XAxis dataKey='date' axisLine={{stroke: color.borderBase, strokeWidth: 1}} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <CartesianGrid vertical={false} stroke={color.borderBase} strokeDasharray='3 3' />
          <Tooltip />
          <Area type='monotone' dataKey='submit' stroke={color.yellow} fill={color.grass} strokeWidth={1}
            dot={{fill: '#fff'}} activeDot={{r: 5, fill: '#fff', stroke: color.green}} />
          <Area type='monotone' dataKey='solved' stroke={color.sky} fill={color.sky} strokeWidth={1}
            dot={{fill: '#fff'}} activeDot={{r: 5, fill: '#fff', stroke: color.blue}} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

HomeChart.propTypes = {
  data: PropTypes.array
}

export default HomeChart
