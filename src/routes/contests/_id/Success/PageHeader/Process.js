/**
 * Created by out_xu on 17/3/7.
 */
import React from 'react'
import { Progress } from 'antd'
import { newDate } from 'utils/dateAbout'
import CountDown from 'components/CountDown'
import { addZero as fixedZero } from 'utils/numberAbout'

class ContestProgress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: Date.now()
    }
  }

  onCountEnd = () => {
    this.setState({time: Date.now()})
  }

  render () {
    const {time} = this.state
    const {start_time, end_time} = this.props.contestInfo
    const start = newDate(start_time)
    const end = newDate(end_time)

    const endStatus = time > end
    const countFormat = (time) => {
      const hours = 60 * 60 * 1000
      const minutes = 60 * 1000

      const h = fixedZero(Math.floor(time / hours))
      const m = fixedZero(Math.floor((time - (h * hours)) / minutes))
      const s = fixedZero(Math.floor((time - (h * hours) - (m * minutes)) / 1000))
      return (
        <span>
          <span> {h} </span> h
          <span> {m} </span> m
          <span> {s} </span> s
        </span>
      )
    }
    return (
      <div className='contest-info-progress'>
        <div className='contest-info-progress-item'>
          <Progress
            status={(endStatus && 'success') || 'active'}
            percent={(endStatus && 100) || (~~(100 * (time - start) / (end - start)))}
            showInfo={false}
            strokeWidth={8}
            className='contest-info-progress-progress'
          />
        </div>
        <div className='contest-info-progress-time'>
          {
            endStatus ? (
              <span className='contest-info-progress-time-over'>已结束</span>
            ) : (
              <CountDown format={countFormat} target={end} onEnd={this.onCountEnd} />
            )
          }
        </div>
      </div>
    )
  }
}

export default ContestProgress
