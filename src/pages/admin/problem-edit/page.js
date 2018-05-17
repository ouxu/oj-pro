import React, { Component } from 'react'

export default class ProblemEdit extends Component {
  render () {
    console.log(this.props)
    return (
      <div className='admin-problem-edit'>
        <div className='header'>
          <div className='h-1'>编辑题目</div>
        </div>
      </div>
    )
  }
}
