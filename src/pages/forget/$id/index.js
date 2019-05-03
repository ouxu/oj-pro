import React, { Component } from 'react'
import { Form, Button, Input } from 'antd'
import router from 'umi/router'

import API from 'config/api'
import request from 'utils/request'
import message from 'utils/message'
import verify from 'utils/regexp'
import errorHandler from 'utils/errorHandler'

const FormItem = Form.Item

@Form.create()
class ResetPassword extends Component {
  state = {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        const { newPassword, newPasswordConfirmation } = values
        const { params = {} } = this.props.match
        const { id = '' } = params
        const data = {
          verify_code: id,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation
        }
        request({ url: API.findPassword, method: 'post', data }).then(
          res => {
            message.success('密码修改成功')
            this.setState({
              loading: false
            })
            router.push('/forget?step=3')
          },
          err => {
            errorHandler(err)
            this.setState({
              loading: false
            })
          }
        )
      }
    })
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('newPassword')) {
      // eslint-disable-next-line standard/no-callback-literal
      callback('两次输入的密码不一致！')
    } else {
      callback()
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { loading = false } = this.state

    return (
      <Form onSubmit={this.handleSubmit} style={{ maxWidth: 300 }}>
        <FormItem label='新密码' hasFeedback>
          {getFieldDecorator('newPassword', {
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
        <FormItem label='确认密码' hasFeedback key='update-password-form-confirm'>
          {getFieldDecorator('newPasswordConfirmation', {
            rules: [
              {
                required: true,
                message: '与上一次密码不一致'
              },
              {
                validator: this.checkPassword
              }
            ]
          })(<Input type='password' />)}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' loading={loading}>
            确认修改
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default ResetPassword
