import { useDispatch } from 'react-redux'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Avatar, Dropdown } from 'antd'

import { toggleCollapsed } from '../../store/collapsed'

import avater from '../../assets/avater.jpg'

const { Header } = Layout

const items = [
  {
    key: '1',
    label: '个人中心',
  },
  {
    key: '2',
    label: '退出登录',
  },
]

function CommonHeader(props) {
  // const collapsed = useSelector(state => state.collapsed.value)
  // eslint-disable-next-line react/prop-types
  const { collapsed } = props
  const dispatch = useDispatch()

  return (
    <Header
      style={{
        padding: '0',
        paddingRight: '16px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(toggleCollapsed())}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />

      <Dropdown
        menu={{
          items,
        }}
        arrow
      >
        <Avatar src={<img src={avater} />} />
      </Dropdown>
    </Header>
  )
}

export default CommonHeader
