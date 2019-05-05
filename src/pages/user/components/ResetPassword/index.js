import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { modifyPassword } from '../../service'

import message from 'utils/message'
import errorHandler from 'utils/errorHandler'
import verify from 'utils/regexp'

const FormItem = Form.Item

@Form.create()
class ResetPassword extends Component {
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('new_password')) {
      // eslint-disable-next-line standard/no-callback-literal
      callback('两次输入的密码不一致！')
    } else {
      callback()
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        const id = this.props.id || ''
        value.user_id = id
        Modal.confirm({
          title: '操作确认',
          content: '请认真审核信息!',
          onOk: () => this.submitForm(value)
        })
      }
    })
  }

  submitForm = values => {
    return modifyPassword(values).then(
      res => {
        message.success('密码更新成功')
      },
      rej => {
        errorHandler(rej)
        throw rej
      }
    )
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{maxWidth: 360}}>
        <div className='h-user mb-16'>修改密码</div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='旧密码' hasFeedback>
            {getFieldDecorator('old_password', {
              rules: [
                {
                  pattern: verify.password,
                  message: '请输入6-18位有效密码！'
                },
                {
                  required: true,
                  message: '请输入你的密码'
                }
              ]
            })(<Input type='password' />)}
          </FormItem>
          <FormItem label='新密码' hasFeedback>
            {getFieldDecorator('new_password', {
              rules: [
                {
                  pattern: verify.password,
                  message: '请输入6-18位有效密码！'
                },
                {
                  required: true,
                  message: '请输入你的密码'
                }
              ]
            })(<Input type='password' />)}
          </FormItem>
          <FormItem label='确认密码' hasFeedback>
            {getFieldDecorator('new_password_confirmation', {
              rules: [
                {
                  required: true,
                  message: '请确认密码'
                },
                {
                  validator: this.checkPassword,
                  message: '与上一次密码不一致'
                }
              ]
            })(<Input type='password' />)}
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit'>
              确认修改
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default ResetPassword
