import React, { Component } from 'react'
import router from 'umi/router'
import Link from 'umi/link'
import { delProblem, createProblem, updateProblem } from './service'
import { getProblem } from '../../problems/$id/service'
import errorHandler from 'utils/errorHandler'
import message from 'utils/message'
/* eslint-disable import/no-duplicates */
import { Form, Input, Radio, Row, Col, Switch } from 'antd'
import { InputNumber, Button, Modal } from 'antd'
/* eslint-disable import/no-duplicates */
const confirm = Modal.confirm
@Form.create()
export default class ProblemEdit extends Component {
  constructor (props) {
    super(props)
    this.state = initState
  }

  componentDidMount () {
    this.initState()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.initState()
    }
  }

  initState = async () => {
    const { query = {} } = this.props.location
    if (!query.id) {
      this.setState(initState)
      return
    }
    const detail = await getProblem(query.id)
    this.setState({ detail: detail })
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.showSubmitModal(values)
      }
    })
  }

  showSubmitModal = values => {
    confirm({
      title: '确认提交？',
      content: '请认真审核信息，确认无错误时再提交!',
      onOk: async () => {
        const { detail = {} } = this.state
        const { id } = detail
        try {
          if (id) {
            await updateProblem(id, { ...values, spj: 'N' })
            this.handleSubmitSuccess()
          } else {
            const { id: problemId } = await createProblem({
              ...values,
              spj: 'N'
            })
            this.handleSubmitSuccess(problemId)
          }
        } catch (e) {
          errorHandler(e)
          return Promise.reject
        }
      }
    })
  }

  handleSubmitSuccess = id => {
    confirm({
      title: '操作成功',
      okText: !id ? '继续修改' : '添加数据',
      iconType: 'check-circle',
      cancelText: '返回列表',
      onCancel: () => {
        router.push('/admin/problem-list')
      },
      onOk: () => {
        if (!id) {
          this.initState()
        } else {
          router.push({
            pathname: '/admin/problem-data',
            query: { id }
          })
        }
      }
    })
  }

  handelDelete = () => {
    confirm({
      title: `是否决定要删除题目-${this.state.detail.id}?删除后无法恢复！`,
      content: (
        <Input
          type='password'
          onChange={e => this.setState({ password: e.target.value })}
          placeholder='请输入您的登录密码'
        />
      ),
      onOk: async () => {
        const { detail = {} } = this.state
        const { id } = detail
        try {
          await delProblem(id, { password: this.state.password })
        } catch (e) {
          errorHandler(e)
          return Promise.reject
        }
        message.success('删除成功')
        router.push('/admin/problem-list')
      }
    })
  }
  render () {
    const { detail = {} } = this.state
    const { id } = detail
    const { getFieldDecorator } = this.props.form
    const isEdit = !!id
    return (
      <div className='admin-problem-edit'>
        <div className='header'>
          {isEdit ? (
            <div className='h-1 flex-lol' style={{ maxWidth: 680 }}>
              <span>编辑题目 - {detail.id}</span>
              <Button type='primary'>
                <Link to={`/admin/problem-data?id=${detail.id}`}>管理题目数据</Link>
              </Button>
            </div>
          ) : (
            <div className='h-1'>添加题目</div>
          )}
        </div>
        <div className='form-content' style={{ maxWidth: 680 }}>
          <Form.Item label='标题'>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题' }],
              initialValue: detail.title || ''
            })(
              <Input.TextArea
                placeholder='请输入标题'
                autosize={{ minRows: 1, maxRows: 6 }}
              />
            )}
          </Form.Item>
          <Form.Item label='描述'>
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入描述' }],
              initialValue: detail.description || ''
            })(
              <Input.TextArea
                placeholder='请输入描述，支持 Markdown 语法，请在 Markdown 编辑器中编辑后粘贴'
                type='textarea'
                autosize={{ minRows: 2 }}
              />
            )}
          </Form.Item>
          <Form.Item label='输入描述'>
            {getFieldDecorator('input', {
              rules: [{ required: true, message: '请描述输入' }],
              initialValue: detail.input || ''
            })(
              <Input.TextArea
                placeholder='描述所需的输入格式和内容'
                autosize={{ minRows: 2 }}
              />
            )}
          </Form.Item>
          <Form.Item label='输出描述'>
            {getFieldDecorator('output', {
              rules: [{ required: true, message: '请描述输出' }],
              initialValue: detail.output || ''
            })(
              <Input.TextArea
                placeholder='描述所需的输出格式和内容'
                autosize={{ minRows: 2 }}
              />
            )}
          </Form.Item>
          <Row>
            <Col {...colProps}>
              <Form.Item>
                <span className='ant-form-item-required mr-8'>时间限制：</span>
                {getFieldDecorator('time_limit', {
                  rules: [{ required: true, message: '请设置题目时间限制' }],
                  initialValue: detail.time_limit || 1
                })(<InputNumber max={512} />)}
                <span className='ml-8'> S</span>
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item>
                <span className='ant-form-item-required mr-8'>内存限制：</span>
                {getFieldDecorator('memory_limit', {
                  rules: [{ required: true, message: '请设置题目时间限制' }],
                  initialValue: detail.memory_limit || 128
                })(<InputNumber max={512} />)}
                <span className='ml-8'> MByte</span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col {...colProps}>
              <Form.Item>
                <span className='ant-form-item-required mr-8'>是否公开：</span>
                {getFieldDecorator('is_public', {
                  rules: [{ required: true, message: '请选择是否公开题目' }],
                  initialValue: +detail.is_public === 1,
                  valuePropName: 'checked'
                })(<Switch />)}
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item>
                <label className='ant-form-item-required mr-8'>
                  难度选择：
                </label>
                {getFieldDecorator('difficulty', {
                  rules: [{ required: true, message: '请设置题目难度' }],
                  initialValue: (detail.difficulty || 2) + ''
                })(
                  <Radio.Group>
                    <Radio value='1'>简单</Radio>
                    <Radio value='2'>一般</Radio>
                    <Radio value='3'>困难</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label='样例输入'>
            {getFieldDecorator('sample_input', {
              rules: [{ required: false, message: '请输入样例输入' }],
              initialValue: detail.sample_input || ''
            })(
              <Input.TextArea
                placeholder='用于前台展示的样例输入'
                autosize={{ minRows: 2 }}
              />
            )}
          </Form.Item>
          <Form.Item label='样例输出'>
            {getFieldDecorator('sample_output', {
              rules: [{ required: true, message: '请输入样例输出' }],
              initialValue: detail.sample_output || ''
            })(
              <Input.TextArea
                placeholder='用于前台展示的样例输出'
                autosize={{ minRows: 2 }}
              />
            )}
          </Form.Item>
          <Form.Item label='来源'>
            {getFieldDecorator('source', {
              rules: [{ required: false, message: '可输入来源' }],
              initialValue: detail.source || ''
            })(
              <Input.TextArea
                placeholder='可输入来源'
                autosize={{ minRows: 1 }}
              />
            )}
          </Form.Item>
          <Form.Item label='提示'>
            {getFieldDecorator('hint', {
              rules: [{ required: false, message: '请输入提示' }],
              initialValue: detail.hint || ''
            })(
              <Input.TextArea
                placeholder='可输入提示'
                autosize={{ minRows: 1 }}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              className='mr-8'
              type='primary'
              onClick={this.handleSubmit}
            >
              {isEdit ? '修改题目' : '添加题目'}
            </Button>
            {isEdit && (
              <Button type='danger' onClick={this.handelDelete}>
                删除题目
              </Button>
            )}
          </Form.Item>
        </div>
      </div>
    )
  }
}

const initState = {
  detail: {
    tags: [],
    is_public: 1
  },
  password: ''
}

const colProps = {
  xs: { span: 24 },
  sm: { span: 12 },
  style: { textAlign: 'left' }
}
