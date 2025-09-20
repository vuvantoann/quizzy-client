import { get } from '../../utils/request'

export const getQuestionsByTopic = async (id) => {
  const result = await get(`api/v1/questions/${id}`)
  return result
}
