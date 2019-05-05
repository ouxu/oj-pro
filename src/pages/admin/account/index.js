import React, { Component } from 'react'
import { Button, Form, Input, Modal, Icon } from 'antd'

import API from 'config/api'
import request from 'utils/request'
import message from 'utils/message'
import verify from 'utils/regexp'

const FormItem = Form.Item

@Form.create()
class Account extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        Modal.confirm({
          title: '操作确认',
          content: '请认真审核信息!',
          onOk: () => this.submitForm(value)
        })
      }
    })
  }

  submitForm = value => {
    return new Promise(async (resolve, reject) => {
      try {
        await request({ url: API.adminResetAccount, method: 'post', token: true, data: value })
        resolve(message.success('密码重置成功'))
      } catch (e) {
        reject(message.error('密码重置失败，请重试！'))
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <div className='h-1 mb-10'>重置密码</div>
        <Form onSubmit={this.handleSubmit} style={{ maxWidth: 300 }}>
          <FormItem>
            {getFieldDecorator('identifier', {
              rules: [{ required: true, message: '请输入要重置的账号!' }]
            })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入账号' />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  pattern: verify.password,
                  message: '密码长度在6-18位之间'
                },
                { required: true, message: '请输入修改后的密码!' }
              ]
            })(
              <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入重置密码' />
            )}
          </FormItem>
          <Button key='submit' type='primary' onClick={this.handleSubmit}>
            重置
          </Button>
        </Form>
      </div>
    )
  }
}

export default Account
