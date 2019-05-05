import React, { Component } from 'react'
import { Button, Input, Form, Select } from 'antd'
import router from 'umi/router'
import { langMap, resultMap } from 'config/tableConfig'

@Form.create()
class SearchBar extends Component {
  filter = query => {
    const { pathname } = this.props.location
    router.replace({
      pathname,
      query
    })
  }
  onSearch = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {}
        for (const key in values) {
          if (values[key]) {
            params[key] = values[key]
          }
        }
        this.filter(params)
      }
    })
  }

  render () {
    const { role } = this.props.user
    const { query } = this.props.location
    const { getFieldDecorator } = this.props.form

    return (
      <div className='flex-lol py-8' style={{borderBottom: ''}}>
        <span className='h-2'>近期提交</span>
        <div>
          {role === 'admin' && getFieldDecorator('user_id', {
            initialValue: query.user_id || ''
          })(
            <Input
              className='mr-8'
              onPressEnter={this.onSearch}
              placeholder='用户ID'
              style={{ width: 120, marginRight: 8 }}
            />
          )}
          {getFieldDecorator('problem_id', {
            initialValue: query.problem_id || ''
          })(<Input onPressEnter={this.onSearch} placeholder='题号' style={{ width: 120, marginRight: 8 }} />)}
          {getFieldDecorator('result', {
            initialValue: query.result || undefined
          })(
            <Select style={{ width: 100, marginRight: 8 }} placeholder='结果' allowClear>
              {resultMap.map(e => (
                <Select.Option key={e.key} value={e.key}>
                  {e.label}
                </Select.Option>
              ))}
            </Select>
          )}
          {getFieldDecorator('language', {
            initialValue: query.language || undefined
          })(
            <Select style={{ width: 100, marginRight: 8 }} placeholder='语言' allowClear>
              {langMap.map(e => (
                <Select.Option key={e.key} value={e.key}>
                  {e.label}
                </Select.Option>
              ))}
            </Select>
          )}
          <Button type='primary' onClick={this.onSearch}>
            搜索
          </Button>
        </div>
      </div>
    )
  }
}

export default SearchBar
