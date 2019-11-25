import React, { Component } from 'react'
import { Button, Input, Alert } from 'antd'
import CountDown from 'components/plugins/CountDown'
import Result from 'components/plugins/Result'
import Link from 'umi/link'
import API from 'config/api'
import request from 'utils/request'
import message from 'utils/message'
import errorHandler from 'utils/errorHandler'

const isEnable = false

class First extends Component {
  state = {}

  sendVerifyMail = () => {
    const { email = '' } = this.state
    const target = new Date(+new Date() + 60000)

    this.setState({ target })

    request({
      url: API.forgotPassword,
      data: { email }
    }).then(
      res => {
        message.success('验证邮件发送成功')
        this.setState({
          success: true
        })
      },
      error => {
        this.setState({ target: false })
        if (Number(error.message) > 0) {
          errorHandler(error)
        } else {
          message.error('验证邮件发送失败，请重试或联系管理员修改密码')
        }
      }
    )
  }

  onEnd = () => {
    this.setState({ target: false })
  }

  render () {
    const { email = '', target = '', success = false } = this.state
    if (success) {
      return (
        <Result
          className='pt-20'
          type='success'
          title='邮件发送成功'
          description='请前往邮箱，根据邮件提示完成重置密码操作'
          actions={
            <div>
              <Button type='primary'>
                <Link to='/home'>返回首页</Link>
              </Button>
            </div>
          }
        />
      )
    }
    const timeFormat = date => ~~(+new Date(date) / 1000)
    return (
      <div>
        {!isEnable && (
          <Alert
            style={{ margin: '0 0 20px', width: 640 }}
            message='重置密码须知'
            description='由于站内邮件服务暂时不可用，如需找回密码请联系相关管理员！'
            type='info'
          />
        )}
        <p className='h-2'>我们需要通过邮箱验证，我们将向您的邮箱发送验证邮件，请注意查收。</p>
        <p className='h-2'>
          验证邮件 60s 只能发送一次，请勿重复点击！当验证邮件过期时会提醒用户不存在，请重新发送验证邮件！
        </p>

        <div className='mt-10' style={{ width: 300 }}>
          <Input.Group compact style={{ display: 'flex' }}>
            <Input
              placeholder='请输入您的邮箱'
              value={email}
              disabled={!isEnable}
              onChange={e => this.setState({ email: e.target.value })}
            />
            {target ? (
              <Button disabled>
                <CountDown target={target} format={timeFormat} onEnd={this.onEnd} />
              </Button>
            ) : (
              <Button onClick={this.sendVerifyMail} type='primary' disabled={!isEnable}>
                发送
              </Button>
            )}
          </Input.Group>
        </div>
      </div>
    )
  }
}

export default First
