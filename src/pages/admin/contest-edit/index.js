import React, { Component } from 'react'
import Link from 'umi/link'
import router from 'umi/router'
import { Form, Input, Radio, Button, DatePicker, Select, Modal } from 'antd'
import moment from 'moment'
import verify from 'utils/regexp'
import { newDate } from 'utils/dateAbout'
import message from 'utils/message'
import errorHandler from 'utils/errorHandler'
import { connect } from 'dva'

import {
  getContest,
  delContest,
  updateProblems,
  updateContest,
  createContest
} from './service'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const TextArea = Input.TextArea
const confirm = Modal.confirm

const initState = {
  isEdit: false,
  contestInfo: {},
  problemsInfo: [],
  password: ''
}

const langMap = [
  {
    value: '0',
    label: 'C'
  },
  {
    value: '1',
    label: 'C++'
  },
  {
    value: '2',
    label: 'Java'
  },
  {
    value: '3',
    label: 'Python'
  }
]

@Form.create()
@connect(({ admin }) => ({ admin }))
export default class ContestEdit extends Component {
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

  initState = () => {
    const { query } = this.props.location
    const isEdit = !!query.id
    if (isEdit) {
      this.fetchData(query.id)
      return
    }
    this.setState(initState)
  }

  fetchData = async id => {
    const data = await getContest(id)
    this.setState({
      contestInfo: data.contest_info,
      problemsInfo: data.problems_info,
      userIds: data.user_ids,
      isEdit: true
    })
  }

  checkPrivate = () => {
    const form = this.props.form
    return +form.getFieldValue('privated')
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const rangeTimeValue = fieldsValue['range-time-picker']
        const startTime = rangeTimeValue[0]
        if (moment().isAfter(startTime)) {
          message.error('竞赛开始时间必须晚于当前时间')
          return
        }
        confirm({
          title: '请认真审核信息，确认无错误时再提交!',
          content: (
            <Input
              type='password'
              onChange={e => this.setState({ password: e.target.value })}
              placeholder='请输入您的登录密码'
            />
          ),
          onOk: async () => {
            const values = preSubmit(fieldsValue, this.state.password)

            let problemParams = {
              password: this.state.password,
              problem_ids: fieldsValue.problems.map(t => +t)
            }

            const { query } = this.props.location
            try {
              if (this.state.isEdit) {
                await updateProblems(query.id, problemParams)
                await updateContest(query.id, values)
              } else {
                await createContest(values)
              }
            } catch (e) {
              errorHandler(e)
              return Promise.reject
            }
            message.success('操作成功')
            router.push('/admin/contest-list')
          }
        })
      }
    })
  }

  onConfirmDel = () => {
    confirm({
      title: '是否决定要删除?删除后无法恢复！',
      content: (
        <Input
          type='password'
          onChange={e => this.setState({ password: e.target.value })}
          placeholder='请输入您的登录密码'
        />
      ),
      onOk: async () => {
        const { query = {} } = this.props.location
        const cid = query.id
        try {
          await delContest(cid, { password: this.state.password })
        } catch (e) {
          errorHandler(e)
          return Promise.reject
        }
        message.success('删除成功')
        router.push('/admin/contest-list')
      }
    })
  }

  render () {
    const { isEdit, contestInfo = {}, problemsInfo = [], userIds } = this.state
    const { getFieldDecorator } = this.props.form
    const { query = {} } = this.props.location
    const { withProblem, id: cid } = query
    const { selectProblems = [] } = this.props.admin
    let progress = NaN
    let problems = problemsInfo.map(e => e.problem_id)

    if (withProblem) {
      problems = [...problems, ...selectProblems]
    }
    const start = newDate(contestInfo.start_time)
    const end = newDate(contestInfo.end_time)
    const time = new Date()
    if (time < start) {
      progress = 'unStart'
    } else if (time < end) {
      progress = 'running'
    } else {
      progress = 'ended'
    }
    return (
      <div className='contest-edit'>
        <div className='h-1'>
          {isEdit ? (
            <span>
              编辑竞赛 —
              <Link target='_black' to={`/contests/${contestInfo.id}`}>
                {' '}
                {contestInfo.id}
              </Link>
            </span>
          ) : (
            '创建竞赛'
          )}
        </div>
        <div className='form-content' style={{ maxWidth: 680 }}>
          <FormItem label='标题'>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题' }],
              initialValue: contestInfo.title || ''
            })(
              <Input
                placeholder='请输入标题'
                type='textarea'
                autosize={{ minRows: 1, maxRows: 6 }}
              />
            )}
          </FormItem>
          <FormItem label='描述'>
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入描述' }],
              initialValue: contestInfo.description || ''
            })(
              <TextArea
                placeholder='请输入描述，支持 Markdown 语法，请在 Markdown 编辑器中编辑后粘贴'
                autosize={{ minRows: 2 }}
              />
            )}
          </FormItem>
          {(progress === 'unStart' || !isEdit) && (
            <FormItem label='时间'>
              {getFieldDecorator('range-time-picker', {
                rules: [
                  { type: 'array', required: true, message: '请选择时间' }
                ],
                initialValue: cid
                  ? [
                    moment(contestInfo.start_time, 'YYYY-MM-DD HH:mm:ss'),
                    moment(contestInfo.end_time, 'YYYY-MM-DD HH:mm:ss')
                  ]
                  : []
              })(<RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />)}
            </FormItem>
          )}
          {isEdit &&
            progress !== 'unStart' && (
            <FormItem label='结束时间'>
              {getFieldDecorator('range-time-picker', {
                rules: [{ required: true, message: '请选择时间' }],
                initialValue: cid
                  ? moment(contestInfo.end_time, 'YYYY-MM-DD HH:mm:ss')
                  : null
              })(<DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />)}
            </FormItem>
          )}
          <FormItem label='权限'>
            {getFieldDecorator('privated', {
              rules: [{ required: true, message: '请设置竞赛状态' }],
              initialValue: contestInfo.private + ''
            })(
              <Radio.Group>
                <Radio value='0'>公开</Radio>
                <Radio value='1'>加密</Radio>
                <Radio value='2'>私有</Radio>
              </Radio.Group>
            )}
          </FormItem>
          {this.checkPrivate() === 1 && (
            <FormItem label='加密密码(直接修改，覆盖原密码)'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    pattern: verify.password,
                    message: '请输入有效的密码(6-18位)'
                  },
                  {
                    required: true,
                    message: '请输入加密密码'
                  }
                ]
              })(<Input placeholder='请输入加密密码' />)}
            </FormItem>
          )}

          <FormItem label='语言'>
            {getFieldDecorator('langmask', {
              rules: [{ type: 'array' }],
              initialValue: contestInfo.langmask
                ? contestInfo.langmask.map(t => t + '')
                : []
            })(
              <Select
                mode='multiple'
                placeholder='请选择支持语言'
                style={{ width: '100%' }}
              >
                {langMap.map(e => (
                  <Option key={e.value} value={e.value}>
                    {e.label}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label='题目'>
            {getFieldDecorator('problems', {
              rules: [{ type: 'array' }],
              initialValue: problems || []
            })(
              <Select
                mode='tags'
                tokenSeparators={[' ']}
                style={{ width: '100%' }}
                notFoundContent='可在 Excel 中复制后直接粘贴'
              />
            )}
          </FormItem>
          {this.checkPrivate() === 2 && (
            <FormItem label='用户'>
              {getFieldDecorator('users', {
                rules: [{ type: 'array' }],
                initialValue: userIds ? userIds.map(t => t.user_id) : []
              })(
                <Select
                  mode='tags'
                  style={{ width: '100%' }}
                  tokenSeparators={[' ']}
                  notFoundContent='可在 Excel 中复制后直接粘贴'
                />
              )}
            </FormItem>
          )}
          <FormItem>
            {cid ? (
              <Button
                className='mr-16'
                type='primary'
                onClick={this.handleSubmit}
              >
                修改竞赛
              </Button>
            ) : (
              <Button type='primary' onClick={this.handleSubmit}>
                添加竞赛
              </Button>
            )}
            {cid && (
              <Button type='danger' onClick={this.onConfirmDel}>
                删除竞赛
              </Button>
            )}
          </FormItem>
        </div>
      </div>
    )
  }
}

const preSubmit = (fieldsValue, password) => {
  const rangeTimeValue = fieldsValue['range-time-picker']
  let values = {
    title: fieldsValue.title,
    private: fieldsValue.privated,
    password: fieldsValue.password,
    langmask: fieldsValue.langmask.map(t => +t),
    problems: fieldsValue.problems.map(t => +t),
    description: fieldsValue.description,
    user_password: password
  }
  if (fieldsValue.users) {
    values = {
      ...values,
      users: fieldsValue.users.map(t => +t)
    }
  }
  if (rangeTimeValue) {
    if (rangeTimeValue.length > 1) {
      values = {
        ...values,
        start_time: rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        end_time: rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')
      }
    } else {
      values = {
        ...values,
        end_time: rangeTimeValue.format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
  return values
}
