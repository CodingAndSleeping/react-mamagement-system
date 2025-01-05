import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Layout, Menu } from 'antd'
import * as Icons from '@ant-design/icons'

import menus from '../../config'

const { Sider } = Layout

// 菜单数据处理
const items = menus.map(item => {
  return {
    key: item.path,
    icon: React.createElement(Icons[item.icon]),
    title: item.title,
    label: item.label,
    children:
      item.children &&
      item.children.map(child => {
        return {
          key: child.path,
          icon: React.createElement(Icons[child.icon]),
          title: child.title,
          label: child.label,
        }
      }),
  }
})

function CommonAside(props) {
  // eslint-disable-next-line react/prop-types
  const { collapsed } = props
  const navigate = useNavigate()

  const handleClick = item => {
    navigate(item.key)
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3
        className='sider-title'
        style={{ color: '#fff', textAlign: 'center' }}
      >
        {collapsed ? '后台' : '通用后台管理系统'}
      </h3>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={items}
        onClick={item => handleClick(item)}
      />
    </Sider>
  )
}

export default CommonAside
