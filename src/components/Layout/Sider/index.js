import React, {Component} from 'react'
import { Link, routerRedux } from 'dva/router'
import { Icon, Layout, Menu } from 'antd'
import ACMLogo1 from 'images/acm_logo_short.png'
import './index.less'

const {Content} = Layout
class SiderContent extends Component {
  render () {
    const {sider, dispatch, location} = this.props
    const {normal = []} = sider
    const MenuRender = (config) => {
      return (
        <Menu.Item key={config.key}>
          <Icon type={config.icon} />
          <span className='nav-text'>{config.value}</span>
        </Menu.Item>
      )
    }
    return (
      <Content className='layout-sider-children'>
        <div className='logo'>
          <Link to='/'>
            <img src={ACMLogo1} alt='logo' />
            <h1>ACM CLUB</h1>
          </Link>
        </div>
        <Menu
          theme='dark' mode='inline'
          selectedKeys={[location.pathname]}
          onClick={({key}) => dispatch(routerRedux.push(key))}>
          {normal.map((item) => MenuRender(item))}
        </Menu>
      </Content>
    )
  }
}

export default SiderContent
