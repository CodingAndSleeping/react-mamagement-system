import React, { useEffect, useState, useRef } from 'react'
import { Col, Row, Card, Table } from 'antd'
import * as Icons from '@ant-design/icons'

import * as echarts from 'echarts'

import { getData } from '../../api/data'

import userImage from '../../assets/avater.jpg'

import './index.scss'

const { Column } = Table

const tableColumns = {
  name: '课程',
  todayBuy: '今日购买',
  monthBuy: '本月购买',
  totalBuy: '总购买',
}

const countData = [
  {
    name: '今日支付订单',
    value: 1234,
    icon: 'CheckOutlined',
    color: '#2ec7c9',
  },
  {
    name: '今日收藏订单',
    value: 210,
    icon: 'StarOutlined',
    color: '#ffb980',
  },
  {
    name: '今日未支付订单',
    value: 1234,
    icon: 'AppstoreOutlined',
    color: '#5ab1ef',
  },
  {
    name: '本月支付订单',
    value: 1234,
    icon: 'CheckOutlined',
    color: '#2ec7c9',
  },
  {
    name: '本月收藏订单',
    value: 210,
    icon: 'StarOutlined',
    color: '#ffb980',
  },
  {
    name: '本月未支付订单',
    value: 1234,
    icon: 'AppstoreOutlined',
    color: '#5ab1ef',
  },
]

function getIconByName(name) {
  return React.createElement(Icons[name])
}

function Home() {
  const [tableData, setTableData] = useState([])

  const orderChartRef = useRef()

  useEffect(() => {
    async function fetchData() {
      const res = await getData()
      const { code, data } = res

      if (code === 20000) {
        const { tableData, orderData } = data
        setTableData(tableData.map(item => ({ ...item, key: item.name })))

        const keyArr = Object.keys(orderData.data[0])
        const series = []
        keyArr.forEach(key => {
          series.push({
            name: key,
            type: 'line',
            data: orderData.data.map(item => item[key]),
          })
        })
        const orderChart = echarts.init(orderChartRef.current)
        orderChart.setOption({
          xAxis: {
            data: orderData.date,
          },
          yAxis: {},
          series,
          legend: {
            data: keyArr,
          },
        })
      }
    }

    fetchData()
  }, [])

  return (
    <Row className='home' gutter={10}>
      <Col span={8}>
        <Card className='user-card' hoverable>
          <div className='user'>
            <img src={userImage} />
            <div className='user-info'>
              <p className='name'>Admin</p>
              <p className='access'>超级管理员</p>
            </div>
          </div>
          <div className='login-info'>
            <p>
              上次登录时间：<span>2022-05-01</span>
            </p>
            <p>
              上次登录地点：<span>广州</span>
            </p>
          </div>
        </Card>

        <Card hoverable>
          <Table dataSource={tableData} pagination={false}>
            {Object.entries(tableColumns).map(([key, label]) => (
              <Column title={label} dataIndex={key} key={key} />
            ))}
          </Table>
        </Card>
      </Col>
      <Col span={16}>
        <div className='num'>
          {countData.map(item => (
            <Card className='num-card' key={item.name} hoverable>
              <i className='icon' style={{ backgroundColor: item.color }}>
                {getIconByName(item.icon)}
              </i>
              <div className='detail'>
                <p className='num'>￥{item.value}</p>
                <p className='txt'>{item.name}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card hoverable>
          <div style={{ height: '380px' }} ref={orderChartRef}></div>
        </Card>
      </Col>
    </Row>
  )
}

export default Home
