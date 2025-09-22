import { useEffect, useState } from 'react'
import { getAnswersByUser } from '../../services/answers'
import { getListTopic } from '../../services/topic'
import { getUserDetail } from '../../services/users'
import { Table, Button } from 'antd'
import './Answer.scss'
import { Link } from 'react-router-dom'

function Answer() {
  const [dataAnswers, setDataAnswers] = useState()
  useEffect(() => {
    const fetchApi = async () => {
      const respond = await getUserDetail()
      const answersByUserId = await getAnswersByUser(respond.infoUser._id)

      const topics = await getListTopic()

      const result = answersByUserId.map((answer) => ({
        ...topics.find((item) => item._id === answer.topicId),
        ...answer,
      }))
      setDataAnswers(result.reverse())
    }

    fetchApi()
  }, [])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      align: 'center',
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Tên chủ đề',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      align: 'center',
    },
    {
      title: 'Số câu hỏi',
      dataIndex: 'questions',
      align: 'center',
    },
    {
      title: 'Ngày làm',
      dataIndex: 'createdAt',
      align: 'center',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Hành động',
      align: 'center',
      render: (_, record) => (
        <Link to={`/result/${record._id}`}>
          <Button type="primary">Xem chi tiết</Button>
        </Link>
      ),
    },
  ]

  return (
    <div className="answer">
      <h2 className="answer__title">Danh sách bài đã làm</h2>
      <Table
        columns={columns}
        dataSource={dataAnswers}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
      />
    </div>
  )
}

export default Answer
