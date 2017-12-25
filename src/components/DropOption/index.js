import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Icon, Menu } from 'antd'

const DropOption = ({onMenuClick, menuOptions = [], buttonStyle, dropdownProps}) => {
  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)
  return (<Dropdown
    overlay={<Menu style={{border: '1px solid #ecf6fd'}} onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <Button style={{border: 'none', ...buttonStyle}}>
      <Icon style={{marginRight: 2}} type='bars' />
      <Icon type='down' />
    </Button>
  </Dropdown>)
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object
}

export default DropOption
