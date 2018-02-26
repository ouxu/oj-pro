/**
 * Created by out_xu on 17/6/28.
 */
import React from 'react'
import { DatePicker, Form, Input, Radio, Select } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
export default (config, getFieldDecorator, extra = {}) => {
  const {
    formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
      }
    },
    initialValue
  } = extra
  const {rules, formType} = config
  let options = []
  switch (formType) {
    case 0:
      return (
        <FormItem
          label={config.label}
          {...formItemLayout}
          hasFeedback={config.hasFeedback || false}
          key={config.value}
          extra={config.extra || ''}
        >
          {getFieldDecorator(config.value, {
            rules: [{
              pattern: rules.pattern || false, message: rules.patternMessage || ''
            }, {
              required: rules.required || false, message: rules.requiredMessage || ''
            }],
            initialValue: initialValue || ''
          })(
            <Input
              className='form-content-input'
              placeholder={config.placeholder || ''}
              disabled={config.disabled || false}
              type={config.type || 'input'}
            />
          )}
        </FormItem>
      )
    case 1:
      options = config.options.map(option => (
        <Radio value={option.value} key={option.value} disabled={config.disabled}>{option.label}</Radio>
      ))
      return (
        <FormItem
          label={config.label}
          {...formItemLayout}
          key={config.value}
          extra={config.extra || ''}
        >
          {getFieldDecorator(config.value, {
            rules: [{required: rules.required || false, message: rules.requiredMessage || ''}],
            initialValue: initialValue || ''
          })(
            <RadioGroup>
              {options}
            </RadioGroup>
          )}
        </FormItem>
      )
    case 2:
      options = config.options.map(option => (
        <Option value={option.value} key={option.value} disabled={config.disabled}>{option.label}</Option>
      ))
      return (
        <FormItem
          label={config.label}
          {...formItemLayout}
          key={config.value}
          extra={config.extra || ''}
        >
          {getFieldDecorator(config.value, {
            rules: [{required: rules.required, message: rules.requiredMessage}],
            initialValue: initialValue || ''
          })(
            <Select>
              {options}
            </Select>
          )}
        </FormItem>
      )
    case 3:
      return (
        <FormItem
          label={config.label}
          {...formItemLayout}
          key={config.value}
          extra={config.extra || ''}
        >
          {getFieldDecorator(config.value, {
            rules: [{required: rules.required, message: rules.requiredMessage}],
            initialValue: initialValue || ''
          })(
            <RangePicker
              style={{width: '100%'}}
              showTime={{format: 'HH:00'}}
              format='YYYY-MM-DD HH:00'
              renderExtraFooter={() => 'extra footer'}
            />
          )}
        </FormItem>
      )
  }
}
