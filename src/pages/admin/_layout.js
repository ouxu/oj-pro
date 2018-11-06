import React from 'react'
import QueueAnim from 'rc-queue-anim'
import {connect} from 'dva'
import Footer from 'layouts/Footer'
import Navigation from 'layouts/Navigation/adminnav'
import AdminSider from 'layouts/AdminSider'
import './index.less'
import Redirect from 'umi/redirect'

const enRoles = ['admin', 'teacher']

function AdminComponent (props) {
  const path = props.location.pathname || '/admin/problem-list'
  if (!enRoles.includes(props.user.role)) {
    return (
      <Redirect to='/home' />
    )
  }
  return (
    <div id='admin'>
      <Navigation />
      <QueueAnim className='admin-wrap' key={props.location.key} delay={100}>
        <div className='admin-sider'>
          <AdminSider select={path} user={props.user} />
        </div>
        <div className='admin-main' key='admin-main'>
          {props.children}
        </div>
      </QueueAnim>
      <Footer />
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(AdminComponent)
