import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { updateUserInfo } from '../../service'

import message from 'utils/message'
import errorHandler from 'utils/errorHandler'

const FormItem = Form.Item
const TextArea = Input.TextArea

@Form.create()
class EditInfo extends Component {
  state = {}

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

  submitForm = values => {
    return updateUserInfo(values).then(
      res => {
        message.success('个人信息更新成功')
        this.props.reInit()
      },
      rej => {
        errorHandler(rej)
        throw rej
      }
    )
  }

  render () {
    const { user } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{maxWidth: 360}}>
        <div className='h-user mb-16'>修改用户信息</div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='用户昵称'>
            {getFieldDecorator('name', {
              initialValue: user.name || ''
            })(<Input placeholder='请输入用户昵称' />)}
          </FormItem>
          <FormItem label='学校'>
            {getFieldDecorator('school', {
              initialValue: user.school || ''
            })(<Input placeholder='请输入所在学校' />)}
          </FormItem>
          <FormItem label='个性签名'>
            {getFieldDecorator('signature', {
              initialValue: user.signature || ''
            })(<TextArea autosize placeholder='请输入个性签名' />)}
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

export default EditInfo
