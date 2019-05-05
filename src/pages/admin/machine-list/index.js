import React, { Component } from 'react'
import { Table, Tag, Button, Drawer, Form, Radio, Input, Modal, Divider } from 'antd'
import { color } from 'utils/theme'
import message from 'utils/message'
import sleep from 'utils/sleep'

import { getJudgeList, getJudgeInfo, updateJudge, addJudge, delJudge } from './service'

const AUTO_DELAY = 10000

const FormItem = Form.Item
const RadioGroup = Radio.Group
const machineStatus = ['关闭', '正常', '异常']
const colorArr = {
  0: color.gray,
  1: color.green,
  2: color.red
}


const renderNumber = text => (text ? Math.round(text * 100) / 100 + '%' : '')

@Form.create()
class MachineList extends Component {
  state = {}
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.auto !== prevState.auto) {
      this.timer && clearInterval(this.timer)
      if (this.state.auto) {
        this.timer = setInterval(this.fetchData, AUTO_DELAY)
      }
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  fetchData = async () => {
    await this.setState({ loading: true })
    const list = await getJudgeList()
    const pAll = list.map(e => {
      if (!e.status) return Promise.resolve({})
      return getJudgeInfo(e.id).then(res => res, rej => ({}))
    })
    const judgeInfos = await Promise.all(pAll)

    const data = judgeInfos.map((e = {}, i) => {
      const item = list[i]
      if (item.status === 1 && (!e || !e.action)) {
        item.status = 2
      }
      return {
        ...e,
        ...item
      }
    })
    this.setState({ data, loading: false })
  }

  showDrawer = record => {
    this.setState({ record, visible: true })
  }

  hideDrawer = () => {
    this.setState({
      visible: false
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        value.is_closed = value.is_closed === '1'
        const id = this.state.record.id
        Modal.confirm({
          title: '操作确认',
          content: '请认真审核信息!',
          onOk: () => this.submitForm(id, value)
        })
      }
    })
  }

  submitForm = (id, value) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (id) {
          await updateJudge(id, value)
        } else {
          await addJudge(value)
        }
        this.fetchData()
        await sleep(1000)
        if (!id) {
          this.hideDrawer()
        }
        resolve(message.success('操作成功'))
      } catch (e) {
        this.fetchData()
        await sleep(1000)
        if (!id) {
          this.hideDrawer()
        }
        reject(message.error('添加成功，但是服务器状态异常'))
      }
    })
  }

  onDel = ({ name='', id = '' }) => {
    Modal.confirm({
      title: '操作确认',
      content: `确认要删除机器- ${name} 吗？`,
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          try {
            await delJudge(id)
            this.fetchData()
            await sleep(1000)
            resolve(message.success('操作成功'))
          } catch (e) {
            await sleep(1000)
            reject(message.error('操作失败，请重试'))
          }
        })
      }
    })
  }

  onAutoRefresh = () => {
    this.setState(state => ({auto: !state.auto}))
  }

  render () {
    const { data = [], record = {}, visible = false, loading = false, auto = false } = this.state
    const { getFieldDecorator } = this.props.form

    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '地址',
        dataIndex: 'host',
        key: 'host'
      },
      {
        key: 'port',
        title: '端口',
        dataIndex: 'port'
      },
      {
        title: '运行状态',
        render: record => <Tag color={colorArr[record.status]}>{machineStatus[record.status]}</Tag>,
        key: 'status'
      },
      {
        title: '处理器占比',
        dataIndex: 'cpu',
        render: (cpus = []) => cpus.map(renderNumber).join(','),
        key: 'cpu'
      },
      {
        title: '内存占比',
        dataIndex: 'memory',
        render: renderNumber,
        key: 'memory'
      },
      {
        title: '主机名称',
        dataIndex: 'hostname',
        key: 'hostname'
      },
      {
        title: '操作',
        key: 'oper',
        render: record => (
          <div>
            <a onClick={() => this.showDrawer(record)}>管理机器</a>
            <Divider type='vertical' />
            <a onClick={() => this.onDel(record)}>删除</a>
          </div>
        ),
        width: 120
      }
    ]

    return (
      <div>
        <div className='flex-lol'>
          <div className='h-1'>机器列表</div>
          <div>
            <Button className="mr-8" type='danger' onClick={this.onAutoRefresh}>
              { auto ? '关闭' : '开启' }自动刷新
            </Button>
            <Button className="mr-8" onClick={this.fetchData}>
              手动刷新
            </Button>
            <Button type='primary' onClick={this.showDrawer}>
              添加机器
            </Button>
          </div>
        </div>
        <Table loading={loading} rowKey='id' size='small' columns={columns} dataSource={data} pagination={false} style={{ marginTop: 16 }}/>
        <Drawer
          title={record.id ? '管理判题机器' : '添加判题机器'}
          placement='right'
          width={640}
          onClose={this.hideDrawer}
          maskClosable={false}
          visible={visible}
          key={visible}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem label='机器名称'>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入机器名称！' }],
                initialValue: record.name || ''
              })(<Input disabled={!!record.name} />)}
            </FormItem>
            <FormItem label='rpc_token'>
              {getFieldDecorator('rpc_token', {
                rules: [{ required: true, message: '请输入机器rpc_token！' }],
                initialValue: record.rpc_token || ''
              })(<Input />)}
            </FormItem>
            <FormItem label='主机地址'>
              {getFieldDecorator('host', {
                rules: [{ required: true, message: '请输入机器主机地址！' }],
                initialValue: record.host || ''
              })(<Input />)}
            </FormItem>
            <FormItem label='主机端口'>
              {getFieldDecorator('port', {
                rules: [{ required: true, message: '请输入机器主机端口！' }],
                initialValue: record.port || ''
              })(<Input />)}
            </FormItem>
            <FormItem label='启用状态'>
              {getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择！' }],
                initialValue: record.status + '' || '0'
              })(
                <RadioGroup>
                  <Radio value='0'>关闭</Radio>
                  <Radio value='1'>开启</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px'
              }}
            >
              <Button key='back' onClick={this.hideDrawer} className='mr-8'>
                取消
              </Button>
              <Button key='submit' type='primary' onClick={this.handleSubmit}>
                提交
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>
    )
  }
}

export default MachineList
