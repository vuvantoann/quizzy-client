import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAnswerDetail } from '../../services/answers'
import { getQuestionsByTopic } from '../../services/questions'
import './Result.scss'

import { FaCheckCircle, FaTimesCircle, FaMinusCircle } from 'react-icons/fa'
import { MdReplay } from 'react-icons/md'

function Result() {
  const params = useParams()
  const navigate = useNavigate()
  const [topicId, setTopicId] = useState('')
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const answerDetail = await getAnswerDetail(params.id)
      const questionList = await getQuestionsByTopic(answerDetail.topicId)

      setTopicId(answerDetail.topicId)

      const mergedResult = questionList.map((question) => ({
        ...question,
        ...answerDetail.answers.find(
          (userAnswer) => userAnswer.questionId === question._id
        ),
      }))

      setQuestionsWithAnswers(mergedResult)
    }

    fetchData()
  }, [params.id])

  if (questionsWithAnswers.length === 0) {
    return <div className="result__loading">Đang tải kết quả...</div>
  }

  const totalQuestions = questionsWithAnswers.length
  const correctCount = questionsWithAnswers.filter(
    (item) => item.answer !== undefined && item.answer === item.correctAnswer
  ).length
  const incorrectCount = questionsWithAnswers.filter(
    (item) => item.answer !== undefined && item.answer !== item.correctAnswer
  ).length
  const skippedCount = questionsWithAnswers.filter(
    (item) => item.answer === undefined
  ).length
  const accuracyPercent = ((correctCount / totalQuestions) * 100).toFixed(1)

  return (
    <div className="result">
      {/* Sidebar */}
      <aside className="result__sidebar">
        <h3 className="result__sidebar-title">Sơ đồ câu hỏi</h3>
        <div className="result__grid">
          {questionsWithAnswers.map((question, index) => {
            let statusClass = ''
            if (question.answer !== undefined) {
              statusClass =
                question.answer === question.correctAnswer
                  ? 'correct'
                  : 'incorrect'
            }
            return (
              <button
                key={question._id}
                className={`result__number ${statusClass}`}
                aria-label={`Câu ${index + 1}`}
              >
                {index + 1}
              </button>
            )
          })}
        </div>
      </aside>

      {/* Content */}
      <main className="result__content">
        {/* Summary */}
        <div className="result__summary">
          <div className="result__summary-top">
            <h2 className="result__title">Hoàn Thành bài kiểm Tra</h2>
            <div className="result__actions">
              <button
                className="result__btn result__btn--retry"
                onClick={() => navigate(`/exam/${topicId}`)}
              >
                <MdReplay size={16} />
                <span>Làm lại</span>
              </button>
            </div>
          </div>

          <div className="result__stats">
            <div className="result__stat">
              <p className="result__stat-label">Kết quả làm bài</p>
              <div className="result__stat-value">
                <strong>
                  {totalQuestions - skippedCount}/{totalQuestions}
                </strong>
              </div>
            </div>

            <div className="result__stat">
              <p className="result__stat-label">Độ chính xác</p>
              <div className="result__stat-value">
                <strong>{accuracyPercent}%</strong>
              </div>
            </div>

            <div className="result__stat">
              <div className="result__stat-left">
                <FaCheckCircle className="result__stat-icon result__stat-icon--correct" />
                <p className="result__stat-label">Trả lời đúng</p>
              </div>
              <div className="result__stat-value">
                <strong>{correctCount}</strong>
              </div>
            </div>

            <div className="result__stat">
              <div className="result__stat-left">
                <FaTimesCircle className="result__stat-icon result__stat-icon--incorrect" />
                <p className="result__stat-label">Trả lời sai</p>
              </div>
              <div className="result__stat-value">
                <strong>{incorrectCount}</strong>
              </div>
            </div>

            <div className="result__stat">
              <div className="result__stat-left">
                <FaMinusCircle className="result__stat-icon result__stat-icon--skipped" />
                <p className="result__stat-label">Bỏ qua</p>
              </div>
              <div className="result__stat-value">
                <strong>{skippedCount}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Questions and Answers */}
        {questionsWithAnswers.map((question, index) => (
          <div key={question._id} className="result__question">
            <h4 className="result__question-title">
              Câu {index + 1}: {question.question}
            </h4>
            <div className="result__answers">
              {question.answers.map((answerText, answerIndex) => {
                let btnClass = ''
                if (question.answer === answerIndex) {
                  btnClass =
                    answerIndex === question.correctAnswer
                      ? 'correct'
                      : 'incorrect'
                } else if (answerIndex === question.correctAnswer) {
                  btnClass = 'correct'
                }
                return (
                  <button
                    key={answerIndex}
                    className={`result__answer-btn ${btnClass}`}
                    disabled
                  >
                    {answerText}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Result
