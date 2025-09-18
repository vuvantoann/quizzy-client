import React, { useEffect, useState } from 'react'
import { Table, Button, Tag } from 'antd'
import { CodeOutlined, CheckCircleOutlined } from '@ant-design/icons'
import './Topic.scss'
import { getListTopic } from '../../services/topic'
import { Link } from 'react-router-dom'

const Topic = () => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListTopic()
      setTopics(result)
    }

    fetchApi()
  }, [])

  const columns = [
    {
      title: 'Tên chủ đề',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => (
        <span className="topic__name">
          <CodeOutlined style={{ marginRight: 8, color: '#1677ff' }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Mức độ',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      render: (level) => {
        let color = 'blue'
        if (level === 'Dễ') color = 'green'
        if (level === 'Khó') color = 'red'
        return <Tag color={color}>{level}</Tag>
      },
    },
    {
      title: 'Số câu hỏi',
      dataIndex: 'questions',
      key: 'questions',
      align: 'center',
    },
    {
      title: 'Làm bài',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Link to={`/exam/${record._id}`}>
          <Button type="primary" icon={<CheckCircleOutlined />}>
            Làm bài
          </Button>
        </Link>
      ),
    },
  ]

  return (
    <div className="topic">
      <h1 className="topic__title">📚 Danh sách Chủ đề Trắc nghiệm</h1>
      <Table
        className="topic__table"
        columns={columns}
        dataSource={topics}
        rowKey="_id"
        pagination={false}
      />
    </div>
  )
}

export default Topic
