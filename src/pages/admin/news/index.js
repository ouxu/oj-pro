import React, { Component } from 'react'
import { Button, Form, Icon, Input, Modal, Radio, Tag, List, Divider, Drawer } from 'antd'
import { color } from 'utils/theme'
import message from 'utils/message'
import sleep from 'utils/sleep'
import { getHomeNews, getNewsDetail, editNews, createNews, delNews } from './service'
import './index.less'

const RadioGroup = Radio.Group
const FormItem = Form.Item
const TextArea = Input.TextArea

@Form.create()
class AdminNews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      news: [],
      total_count: 999,
      visible: false,
      modal: {},
      loading: false
    }
  }

  componentDidMount () {
    this.fetchNews()
  }

  fetchNews = async () => {
    const param = {
      page: 1,
      size: 1000
    }
    const data = await getHomeNews(param)
    this.setState({ ...data })
  }

  showModal = async (modal = {}) => {
    if (modal.id) {
      const data = await getNewsDetail(modal.id)
      modal = {
        ...modal,
        ...data
      }
    }
    this.setState({
      visible: true,
      modal
    })
  }

  hideModal = () => {
    this.setState({
      visible: false
    })
  }

  handleOk = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        try {
          if (this.state.modal.id) {
            await editNews(this.state.modal.id, values)
          } else {
            await createNews(values)
          }
          this.fetchNews()
          await sleep(1000)
          message.success('操作成功')
          this.setState({
            loading: false,
            visible: false
          })
        } catch (e) {
          message.error('操作失败，请重试')
          this.setState({
            loading: false
          })
        }
      }
    })
  }

  delNews = item => {
    Modal.confirm({
      title: '确认删除?',
      content: '请认真审核信息，一旦删除，本次删除将无法撤销!',
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          try {
            await delNews(item.id)
            await sleep(1000)
            this.fetchNews()
            resolve(message.success('操作成功'))
          } catch (e) {
            console.error(e)
            await sleep(1000)
            reject(message.error('操作失败，请重试'))
          }
        })
      }
    })
  }

  render () {
    const { news = [], visible, modal } = this.state
    const { getFieldDecorator } = this.props.form

    const privateStatus = ['固定', '普通', '重要', '紧急']
    const colorArr = [color.blue, color.green, color.yellow, color.red]
    const title = (
      <span className='news-manage-table-title'>
        <span>公告列表</span>
        <span className='news-manage-table-title-icon hand' onClick={this.showModal}>
          <Icon type='plus-square-o' /> 发布公告
        </span>
      </span>
    )

    return (
      <div className='news-manage'>
        <div className='h-1 mb-16'>主页公告</div>
        <List
          itemLayout='horizontal'
          dataSource={news}
          header={title}
          renderItem={item => (
            <List.Item
              actions={[
                <a target='_blank' href={`/news?id=${item.id}`}>查看</a>,
                <a onClick={() => this.showModal(item)}>编辑</a>,
                <a onClick={() => this.delNews(item)}>删除</a>
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={
                  <div>
                    <Icon type='bulb' /> {item.created_at}
                    <Divider type='vertical' />
                    <Icon type='edit' /> {item.updated_at}
                  </div>
                }
              />
              <Tag color={colorArr[item.importance]}>{privateStatus[item.importance]}</Tag>
            </List.Item>
          )}
        />
        <Drawer
          title={modal.id ? '编辑公告' : '发布公告'}
          placement='right'
          width={640}
          onClose={this.hideModal}
          maskClosable={false}
          visible={visible}
          className='news-manage-drawer-content'
        >
          <Form onSubmit={this.handleOk}>
            <FormItem label='标题'>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题' }],
                initialValue: modal.title || ''
              })(<TextArea placeholder='请输入标题' autosize={{ maxRows: 6 }} />)}
            </FormItem>
            <FormItem label='描述'>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入内容！' }],
                initialValue: modal.content || ''
              })(
                <TextArea
                  placeholder='请输入内容，支持 Markdown 语法，请在 Markdown 编辑器中编辑后粘贴'
                  autosize={{ minRows: 4, maxRows: 16 }}
                />
              )}
            </FormItem>
            <FormItem label='请选择重要程度，会根据程度展示不同样式'>
              {getFieldDecorator('importance', {
                rules: [{ required: true, message: '请选择！' }],
                initialValue: modal.importance || ''
              })(
                <RadioGroup onChange={this.onChange}>
                  {privateStatus.map((e, i) => (
                    <Radio key={i} value={i}>
                      <Tag color={colorArr[i]}>{e}</Tag>
                    </Radio>
                  ))}
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
              <Button key='back' onClick={this.hideModal} className='mr-8'>
                取消
              </Button>
              <Button key='submit' type='primary' loading={this.state.loading} onClick={this.handleOk}>
                提交
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>
    )
  }
}

export default AdminNews
