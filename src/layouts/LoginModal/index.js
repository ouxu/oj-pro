/**
 * Created by out_xu on 17/8/18.
 */
import React from 'react'
import { Button, Form, Icon, Input, Modal } from 'antd'
import router from 'umi/router'
import verify from 'utils/regexp'
import './index.less'

const LoginModal = ({form, user, dispatch, location, utils}) => {
  const modalProps = {
    title: '登录NEUQ-OJ',
    visible: utils.modal,
    footer: false,
    width: 360,
    onCancel: () => dispatch({type: 'utils/hideModal'})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({type: 'user/login', payload: {values, location}})
      }
    })
  }
  const handleLink = (link) => {
    dispatch({type: 'utils/hideModal'})
    router.push(link)
  }
  const {getFieldDecorator} = form
  return (
    <Modal {...modalProps}>
      <Form className='login-wrap'>
        <Form.Item>
          {getFieldDecorator('identifier', {
            rules: [{
              required: true, message: '请输入UserName/手机号/邮箱'
            }]
          })(
            <Input
              addonBefore={<Icon type='user' />} style={{width: '100%'}}
              placeholder='UserName/手机号/邮箱'
              onPressEnter={handleSubmit}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              pattern: verify.password, message: '请输入有效的密码(6-18位)'
            }, {
              required: true, message: '请输入密码！'
            }]
          })(
            <Input
              addonBefore={<Icon type='lock' />} type='password'
              placeholder='Password' style={{width: '100%'}}
              onPressEnter={handleSubmit}
            />
          )}
        </Form.Item>

        <Button onClick={handleSubmit} type='primary' id='login-btn' loading={utils.loading}>登录</Button>
        <a onClick={() => handleLink('/user/register')}>
          <span>注册账号</span>
        </a>
        <a onClick={() => handleLink('/user/forget')}>
          <span className='login-form-forgot'>忘记密码</span>
        </a>
      </Form>
    </Modal>
  )
}

export default Form.create()(LoginModal)
