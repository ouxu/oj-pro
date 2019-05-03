import React, { Component } from 'react'
import { Button, Form, Input, Modal, Checkbox, Tooltip } from 'antd'
import router from 'umi/router'
import API from 'config/api'
import request from 'utils/request'
import message from 'utils/message'
import verify from 'utils/regexp'
import errorHandler from 'utils/errorHandler'
import { connect } from 'dva'

const FormItem = Form.Item

@connect()
@Form.create()
class First extends Component {
  state = {}

  componentDidMount () {
    this.getCaptcha()
  }

  getCaptcha = async () => {
    const res = await request({ url: API.register }).then(res => res, rej => {})
    const url = res.url || ''
    const stamp = +Date.now()
    this.setState({ url, stamp })
  }

  refreshCaptcha = () => {
    this.setState({
      stamp: +new Date()
    })
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
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
        Modal.confirm({
          title: '操作确认',
          content: '请确认所有信息填写无误!',
          onOk: () => {
            request({ url: API.register, method: 'post', data: value }).then(res => {
              message.success('注册成功')
              // 自动登录
              const body = {
                identifier: value.email,
                password: value.password
              }
              this.props
                .dispatch({
                  type: 'user/login',
                  payload: { values: body }
                })
                .then(() => {
                  router.push('/home')
                })
            }, errorHandler)
          }
        })
      }
    })
  }

  checkAgreement = e => {
    this.setState({
      checkAgreement: e.target.checked
    })
  }

  render () {
    const { url = '', stamp = '', checkAgreement } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} style={{ maxWidth: 500 }}>
        <FormItem label='用户名' hasFeedback>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(<Input />)}
        </FormItem>
        <FormItem label='邮箱'>
          {getFieldDecorator('email', {
            rules: [
              {
                pattern: verify.mail,
                message: '输入的不是有效的邮箱！'
              },
              {
                required: true,
                message: '请输入邮箱!'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='密码' hasFeedback>
          {getFieldDecorator('password', {
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
          {getFieldDecorator('password_confirmation', {
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
        <FormItem label='手机号码'>
          {getFieldDecorator('mobile', {
            rules: [
              {
                pattern: verify.mobile,
                message: '请输入正确的手机号码'
              },
              {
                required: true,
                message: '请输入你的手机号码'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='学校'>{getFieldDecorator('school')(<Input />)}</FormItem>
        <FormItem label='验证码'>
          <div className='d-flex' style={{ width: 310 }}>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请输入验证码！' }]
            })(<Input style={{ width: 200 }} />)}
            <img
              src={url + '?' + stamp}
              onClick={this.refreshCaptcha}
              key={stamp}
              style={{
                marginLeft: 10,
                width: 100,
                height: 32,
                border: '1px solid #d9d9d9',
                borderRadius: 4
              }}
            />
          </div>
        </FormItem>
        <div
          style={{
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: '1px solid #e8e8e8'
          }}
        >
          <Checkbox className='mt-4' onChange={this.checkAgreement}>
            我同意
            <Tooltip title='Just do it！'>
              <span className='user-should-know'>《用户协议》</span>
            </Tooltip>
          </Checkbox>
        </div>

        <Button key='submit' type='primary' onClick={this.handleSubmit} disabled={!checkAgreement}>
          点击注册
        </Button>
      </Form>
    )
  }
}

export default First
