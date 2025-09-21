import { useParams } from 'react-router-dom'
import { getQuestionsByTopic } from '../../services/questions'
import { getTopicDetail } from '../../services/topic'
import { useEffect, useState } from 'react'
import './Exam.scss'
import { getUserDetail } from '../../services/users'
import { saveAnswer } from '../../services/answers'

function Exam() {
  const params = useParams()
  const [topic, setTopic] = useState({})
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([]) // [{ questionId, answer }]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState('single') // "single" | "all"

  // Lấy thông tin topic
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const result = await getTopicDetail(params.id)
        setTopic(result)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTopic()
  }, [params.id])

  // Lấy danh sách câu hỏi
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await getQuestionsByTopic(params.id)
        setQuestions(result)
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuestions()
  }, [params.id])

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // Chọn đáp án → update mảng
  const handleSelectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => {
      const existing = prev.find((item) => item.questionId === questionId)
      if (existing) {
        return prev.map((item) =>
          item.questionId === questionId
            ? { ...item, answer: answerIndex }
            : item
        )
      }
      return [...prev, { questionId: questionId, answer: answerIndex }]
    })
  }

  // const handleSelectAnswer = (questionId, answerIndex) => {
  //   setSelectedAnswers((prev) => {
  //     // Bước 1: tìm xem đã có câu này chưa
  //     const found = prev.find((item) => item.questionId === questionId)

  //     if (found) {
  //       // Bước 2: nếu có rồi -> cập nhật lại câu trả lời
  //       const updated = prev.map((item) => {
  //         if (item.questionId === questionId) {
  //           return { ...item, answer: answerIndex }
  //         }
  //         return item
  //       })
  //       return updated
  //     } else {
  //       // Bước 3: nếu chưa có -> thêm mới
  //       const newAnswer = { questionId, answer: answerIndex }
  //       return [...prev, newAnswer]
  //     }
  //   })
  // }

  const handleToggleMode = () => {
    setMode((prev) => (prev === 'single' ? 'all' : 'single'))
  }

  const handleSubmit = async () => {
    const result = await getUserDetail()
    const payload = {
      userId: result.infoUser._id, // TODO: lấy từ login/token
      examId: params.id,
      answers: selectedAnswers,
    }
    const respond = await saveAnswer(payload)
    if (respond) {
      console.log('Dữ liệu gửi lên backend:', payload)
      alert('Bài làm đã được nộp!')
    }
  }

  if (isLoading) {
    return <div className="exam__loading">Đang tải câu hỏi...</div>
  }

  if (questions.length === 0) {
    return <div className="exam__empty">Không có câu hỏi nào.</div>
  }

  return (
    <div className="exam">
      {/* Sidebar */}
      <aside className="exam__sidebar">
        <h3 className="exam__sidebar-title">Sơ đồ câu hỏi</h3>
        <div className="exam__grid">
          {questions.map((question, index) => {
            const isAnswered = selectedAnswers.some(
              (a) => a.questionId === question._id
            )
            return (
              <button
                key={question._id}
                className={`exam__number
                  ${
                    mode === 'single' && currentQuestionIndex === index
                      ? 'active'
                      : ''
                  }
                  ${isAnswered ? 'answered' : ''}
                `}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            )
          })}
        </div>
        <button onClick={handleSubmit} className="exam__btn exam__btn--submit">
          Nộp bài
        </button>
      </aside>

      {/* Content */}
      <main className="exam__content">
        <div className="exam__header">
          <h2 className="exam__title">Bài trắc nghiệm chủ đề {topic.name}</h2>
          <div className="exam__actions">
            <button onClick={handleToggleMode} className="exam__btn">
              {mode === 'single' ? 'Xem tất cả' : 'Xem từng câu'}
            </button>
          </div>
        </div>

        {mode === 'all' ? (
          <>
            {questions.map((question, index) => (
              <div key={question._id} className="exam__question">
                <h4 className="exam__question-title">
                  Câu {index + 1}: {question.question}
                </h4>
                <div className="exam__answers">
                  {question.answers.map((answer, answerIndex) => {
                    // const isSelected =
                    //   selectedAnswers.find((a) => a.questionId === question._id)
                    //     ?.answer === answerIndex

                    const found = selectedAnswers.find(
                      (a) => a.questionId === question._id
                    )
                    const isSelected = found
                      ? found.answer === answerIndex
                      : false
                    return (
                      <button
                        key={answerIndex}
                        className={`exam__answer-btn ${
                          isSelected ? 'selected' : ''
                        }`}
                        onClick={() =>
                          handleSelectAnswer(question._id, answerIndex)
                        }
                      >
                        {answer}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="exam__question">
              <h4 className="exam__question-title">
                Câu {currentQuestionIndex + 1}:{' '}
                {questions[currentQuestionIndex].question}
              </h4>
              <div className="exam__answers">
                {questions[currentQuestionIndex].answers.map(
                  (answer, answerIndex) => {
                    const isSelected =
                      selectedAnswers.find(
                        (a) =>
                          a.questionId === questions[currentQuestionIndex]._id
                      )?.answer === answerIndex
                    return (
                      <button
                        key={answerIndex}
                        className={`exam__answer-btn ${
                          isSelected ? 'selected' : ''
                        }`}
                        onClick={() =>
                          handleSelectAnswer(
                            questions[currentQuestionIndex]._id,
                            answerIndex
                          )
                        }
                      >
                        {answer}
                      </button>
                    )
                  }
                )}
              </div>
            </div>
            <div className="exam__nav">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="exam__btn"
              >
                Prev
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="exam__btn"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Exam
