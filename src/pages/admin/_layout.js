import React from 'react'
import QueueAnim from 'rc-queue-anim'
import {connect} from 'dva'
import Footer from 'layouts/Footer'
import Navigation from 'layouts/Navigation/adminnav'
import AdminSider from 'layouts/AdminSider'
import './index.less'

function AdminComponent (props) {
  const { path = '/admin/problem-list' } = props.route.routes[1]
  return (
    <QueueAnim id='admin' type={['left', 'right']} delay={100}>
      <Navigation />
      <QueueAnim className='admin-wrap' key='admin-wrap' type={['left', 'right']} delay={100}>
        <div className='admin-sider' key='admin-sider'>
          <AdminSider select={path} user={props.user} />
        </div>
        <div className='admin-main' key='admin-main'>
          {props.children}
        </div>
      </QueueAnim>
      <Footer />
    </QueueAnim>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(AdminComponent)
