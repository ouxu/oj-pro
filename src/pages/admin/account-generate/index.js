import React, { Component } from 'react'
import { Table, Button, Form, Input, Modal, InputNumber, Divider } from 'antd'
import copy from 'copy-to-clipboard'

import API from 'config/api'
import request from 'utils/request'
import message from 'utils/message'

const FormItem = Form.Item
const TextArea = Input.TextArea

@Form.create()
class AccountGenerate extends Component {
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

  submitForm = value => {
    return new Promise(async (resolve, reject) => {
      try {
        const names = value.names || ''
        if (names) {
          value.names = names.split(',')
        } else {
          delete value.names
        }
        const list = await request({ url: API.userGenerate, method: 'post', token: true, data: value })
        this.setState({ list })
        resolve(message.success('账号生成成功'))
      } catch (e) {
        reject(message.error('账号生成失败，请重试！'))
      }
    })
  }

  handleCopy = () => {
    const { list = [] } = this.state
    const text = list.map(item => Object.keys(item).map(key => item[key]).join('\t')).join('\n')
    copy(text)
    message.success('复制成功')
  }
  render () {
    const { list = [] } = this.state
    const { getFieldDecorator } = this.props.form
    const columns = [
      {
        title: '帐号',
        dataIndex: 'email'
      },
      {
        title: '密码',
        dataIndex: 'password'
      },
      {
        title: '队伍名称',
        dataIndex: 'name'
      }
    ]
    return (
      <div>
        <div className='h-1'>账号生成</div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='队伍前缀'>
            {getFieldDecorator('prefix', {
              rules: [{ required: true, message: '请输入队伍前缀！' }]
            })(<Input style={{ width: 240 }} />)}
          </FormItem>
          <FormItem label='生成账号数量'>
            {getFieldDecorator('num', {
              rules: [{ required: true, message: '请输入队伍前缀！' }]
            })(<InputNumber style={{ width: 240 }} min={1} />)}
          </FormItem>
          <FormItem label='队伍名称（选填，队名之间请英文逗号分隔）'>
            {getFieldDecorator('names', { initialValue: '' })(
              <TextArea style={{ maxWidth: 680 }} placeholder='请输入队伍名称' autosize={{ minRows: 3, maxRows: 6 }} />
            )}
          </FormItem>
          <Button key='submit' type='primary' onClick={this.handleSubmit}>
            生成
          </Button>
        </Form>
        <Divider />
        <div>
          <Table columns={columns} dataSource={list} size='small' rowKey='id' pagination={false} />
          <Button className='mt-10' type='primary' onClick={this.handleCopy}>
            复制账号数据
          </Button>
        </div>
      </div>
    )
  }
}

export default AccountGenerate
