/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import Media from 'react-media'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import { Layout } from 'antd'
import QueueAnim from 'rc-queue-anim'
import SiderContent from './Sider'
import HeaderContent from './Header'
import './index.less'

const { Content, Sider } = Layout

function LayoutContent(props) {
  const { root, dispatch, location, user, utils } = props

  if (location.pathname.indexOf('admin') !== -1) {
    return props.children
  }

  const { layout } = root
  const headerProps = {
    user, dispatch, location, utils
  }
  let siderProps = {
    collapsible: true,
    collapsed: layout.collapsed,
    width: 180,
    onCollapse: (collapsed, type) => {
      dispatch({ type: 'root/onCollapse', payload: { collapsed, type } })
    },
    breakpoint: 'xs'
  }
  let layoutClass = 'layout-content' + (layout.collapsed ? ' collapsed' : '')

  return (
    <Media query={{ maxWidth: 575 }}>
      {matches => {
        if (matches) {
          siderProps = {
            ...siderProps,
            breakpoint: 'xs',
            collapsedWidth: '0'
          }
        } else {
          siderProps = { ...siderProps }
        }
        return (
          <Layout className='layout'>
            <Sider {...siderProps} className='sider'>
              <SiderContent sider={root.layout.sider} dispatch={dispatch} location={location} />
            </Sider>
            <Layout className={layoutClass} key={user.token}>
              <HeaderContent {...headerProps} />
              <Content>
                {props.children}
              </Content>
            </Layout>
          </Layout>
        )
      }}
    </Media>
  )
}

const mapStateToProps = ({ user, root, utils }) => ({ root, user, utils })
export default withRouter(connect(mapStateToProps)(LayoutContent))
