import React, { Component } from 'react'
import { Button, Dropdown, Icon, Layout, Menu, Modal } from 'antd'
import './index.less'
import { Link } from 'dva/router'
import LoginModal from '../LoginModal'
import ACMLogo2 from 'images/acm_logo_long.png'
import message from 'utils/message'

const ButtonGroup = Button.Group

const {Header} = Layout
const enAdmin = ['teacher', 'admin']

class HeaderContent extends Component {
  onClickLogout = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    Modal.confirm({
      title: '退出确认',
      content: '是否退出？退出后下次进入需要重新登录。',
      onOk () {
        dispatch({type: 'user/logout'})
        message.neutral('登出成功')
      }
    })
  }

  render () {
    const {user, dispatch, utils} = this.props
    const menu = (
      <Menu style={{width: 90, float: 'right'}}>
        {
          enAdmin.includes(user.role) && (
            <Menu.Item>
              <Link to='/admin'>进入后台</Link>
            </Menu.Item>
          )
        }
        <Menu.Item>
          <a onClick={this.onClickLogout}> 退出登录 </a>
        </Menu.Item>
        <Menu.Divider />
      </Menu>
    )
    return (
      <Header className='layout-header flex-lol' id='navigation'>
        <div>
          <div className='logo'>
            <Link to='/'>
              <img src={ACMLogo2} alt='logo' />
            </Link>
          </div>
          <LoginModal user={user} utils={utils} dispatch={dispatch} />
        </div>
        {user.token ? (
          <Dropdown overlay={menu}>
            <span style={{marginLeft: 10}}>
              <Icon type='user' /> {user.user.name || '未命名用户'} <Icon type='down' />
            </span>
          </Dropdown>
        ) : (
          <div className='user-login-warp' style={{marginLeft: 12}}>
            <ButtonGroup>
              <Button
                className='user-login-btn'
                type='primary' size='small'
                onClick={() => dispatch({type: 'utils/showModal'})}
              >
                登录
              </Button>
              <Button className='user-login-btn' type='primary' size='small' ghost> 注册</Button>
            </ButtonGroup>
          </div>
        )}
      </Header>
    )
  }
}

export default HeaderContent
