import { useState, useRef, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Table,
  Modal,
  Select,
  DatePicker,
  Popconfirm,
  message,
} from 'antd'
import dayjs from 'dayjs'

import { getUser, deleteUser, addUser, updateUser } from '../../api/data'
const { Item } = Form

function User() {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      key: 'sex',
      render: (_, row) => (row.sex ? '女' : '男'),
    },
    {
      title: '生日',
      key: 'birth',
      dataIndex: 'birth',
    },

    {
      title: '地址',
      dataIndex: 'addr',
      key: 'addr',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, row) => {
        return (
          <div>
            <Button
              type='primary'
              onClick={() => openDialog('edit', row)}
              style={{ marginRight: 10 }}
            >
              编辑
            </Button>
            <Popconfirm
              title='确定要删除吗？'
              onConfirm={() => onDeleteConfirm(row.id)}
              okText='确认'
              cancelText='取消'
            >
              <Button type=''>删除</Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  const formRef = useRef(null)

  const [tableData, setTableData] = useState([])
  async function fetchData() {
    const res = await getUser({
      ...formRef.current.getFieldsValue(),
    })

    if (res.code === 20000) {
      setTableData(res.list)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const onDeleteConfirm = async id => {
    const res = await deleteUser(id)

    if (res.code === 20000) {
      message.success('删除成功')

      fetchData()
    } else {
      message.error('删除失败')
    }
  }

  const dialogFormRef = useRef(null)

  const [dialogvisible, setDialogvisible] = useState(false)
  const [dialogType, setDialogType] = useState('')
  const [currentData, setCurrentData] = useState(null)

  const openDialog = (type, row) => {
    if (row) {
      setCurrentData({ ...row })
    }

    setDialogType(type)

    setDialogvisible(true)
  }

  useEffect(() => {
    if (currentData) {
      dialogFormRef.current.setFieldsValue({
        ...currentData,
        birth: dayjs(currentData.birth),
      })
    }
  }, [currentData])

  const handleOk = async () => {
    if (dialogType === 'add') {
      const res = await addUser({
        ...dialogFormRef.current.getFieldsValue(),

        birth: dayjs(dialogFormRef.current.getFieldValue('birth')).format(
          'YYYY-MM-DD'
        ),
      })
      if (res.code === 20000) {
        message.success('新增成功')
        fetchData()
      } else {
        message.error('新增失败')
      }
    } else {
      const res = await updateUser({
        id: currentData.id,
        ...dialogFormRef.current.getFieldsValue(),

        birth: dayjs(dialogFormRef.current.getFieldValue('birth')).format(
          'YYYY-MM-DD'
        ),
      })

      if (res.code === 20000) {
        message.success('编辑成功')
        fetchData()
      } else {
        message.error('编辑失败')
      }
    }
    dialogFormRef.current.resetFields()
    setDialogvisible(false)
  }

  const handleCancel = () => {
    dialogFormRef.current.resetFields()
    setDialogvisible(false)
  }

  return (
    <div className='manage'>
      <div
        className='manage-header'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Form ref={formRef} layout='inline'>
          <Item label='姓名' name='name'>
            <Input placeholder={'请输入姓名'}></Input>
          </Item>

          <Button type='primary' onClick={() => fetchData()}>
            搜索
          </Button>
        </Form>

        <Button type='primary' onClick={() => openDialog('add')}>
          新增
        </Button>
      </div>

      <div className='result-table'>
        <Table columns={columns} dataSource={tableData} rowKey='id'></Table>
      </div>

      <div className='dialog-container'>
        <Modal
          title={dialogType === 'add' ? '新增用户' : '编辑用户'}
          open={dialogvisible}
          okText='确定'
          cancelText='取消'
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form ref={dialogFormRef}>
            <Item label='姓名' name='name'>
              <Input placeholder={'请输入姓名'}></Input>
            </Item>

            <Item label='年龄' name='age'>
              <Input placeholder={'请输入年龄'}></Input>
            </Item>

            <Item label='性别' name='sex'>
              <Select
                style={{ width: 120 }}
                options={[
                  {
                    value: 0,
                    label: '男',
                  },
                  {
                    value: 1,
                    label: '女',
                  },
                ]}
              />
            </Item>

            <Item label='生日' name='birth'>
              <DatePicker format={'YYYY-MM-DD'} />
            </Item>

            <Item label='地址' name='addr'>
              <Input placeholder={'请输入地址'}></Input>
            </Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default User
