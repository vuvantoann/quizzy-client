import { useParams } from 'react-router-dom'
import { getQuestionsByTopic } from '../../services/questions'
import { useEffect, useState } from 'react'
import './Exam.scss'

function Exam() {
  const params = useParams()

  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState('single') // "single" | "all"

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

  const handleSelectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleToggleMode = () => {
    setMode((prev) => (prev === 'single' ? 'all' : 'single'))
  }

  const handleSubmit = () => {
    console.log('Dữ liệu gửi lên backend:', selectedAnswers)
    alert('Bài làm đã được nộp!')
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
          {questions.map((question, index) => (
            <button
              key={question._id}
              className={`exam__number
                ${
                  mode === 'single' && currentQuestionIndex === index
                    ? 'active'
                    : ''
                }
                ${selectedAnswers[question._id] !== undefined ? 'answered' : ''}
              `}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}
      <main className="exam__content">
        <div className="exam__header">
          <h2 className="exam__title">Bài trắc nghiệm tổng hợp</h2>
          <div className="exam__actions">
            <button onClick={handleToggleMode} className="exam__btn">
              {mode === 'single' ? 'Xem tất cả' : 'Xem từng câu'}
            </button>
            <button
              onClick={handleSubmit}
              className="exam__btn exam__btn--submit"
            >
              Nộp bài
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
                  {question.answers.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      className={`exam__answer-btn ${
                        selectedAnswers[question._id] === answerIndex
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() =>
                        handleSelectAnswer(question._id, answerIndex)
                      }
                    >
                      {answer}
                    </button>
                  ))}
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
                  (answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      className={`exam__answer-btn ${
                        selectedAnswers[questions[currentQuestionIndex]._id] ===
                        answerIndex
                          ? 'selected'
                          : ''
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
