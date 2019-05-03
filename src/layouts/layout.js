/**
 * Created by out_xu on 17/7/13.
 */
import React, { PureComponent } from 'react'
import Media from 'react-media'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import { Layout } from 'antd'
import SiderContent from './Sider'
import HeaderContent from './Header'
import './index.less'

const { Content, Sider } = Layout

class LayoutContent extends PureComponent {
  render () {
    const { root, dispatch, location, user, utils } = this.props

    if (location.pathname.indexOf('admin') !== -1 || location.pathname.indexOf('full') !== -1) {
      return this.props.children
    }

    const { layout } = root
    const headerProps = {
      user,
      dispatch,
      location,
      utils
    }
    let siderProps = {
      collapsible: true,
      collapsed: layout.collapsed,
      width: 180,
      onCollapse: (collapsed, type) => {
        dispatch({
          type: 'root/onCollapse',
          payload: {
            collapsed,
            type
          }
        })
      },
      breakpoint: 'xs'
    }
    let layoutClass = 'layout-content' + (layout.collapsed ? ' collapsed' : '')
    return (
      <Media
        query={{
          maxWidth: 575
        }}
      >
        {matches => {
          if (matches) {
            siderProps = {
              ...siderProps,
              breakpoint: 'xs',
              collapsedWidth: '0'
            }
          } else {
            siderProps = {
              ...siderProps
            }
          }

          return (
            <Layout className='layout'>
              <Sider {...siderProps} className='sider'>
                <SiderContent sider={root.layout.sider} dispatch={dispatch} location={location} />
              </Sider>
              <Layout className={layoutClass} key={user.token}>
                <HeaderContent {...headerProps} />
                <QueueAnim key={location.key} delay={100}>
                  <Content key='content-wrap'>{this.props.children}</Content>
                </QueueAnim>
              </Layout>
            </Layout>
          )
        }}
      </Media>
    )
  }
}

const mapStateToProps = ({ user, root, utils }) => ({ root, user, utils })
export default withRouter(connect(mapStateToProps)(LayoutContent))
