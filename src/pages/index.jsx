import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { useSelector } from 'react-redux'

import CommonAside from '../components/commonAside'
import CommonHeader from '../components/commonHeader'
const { Content } = Layout
function Index() {
  const collapsed = useSelector(state => state.collapsed.value)

  return (
    <Layout>
      <CommonAside collapsed={collapsed} />
      <Layout>
        <CommonHeader collapsed={collapsed} />
        <Content
          style={{
            margin: '16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index
