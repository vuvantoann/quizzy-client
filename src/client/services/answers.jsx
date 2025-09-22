import { get, post } from '../../utils/request'

export const getListAnswer = async () => {
  const result = await get('api/v1/answers')
  return result
}

export const getAnswerDetail = async (id) => {
  const result = await get(`api/v1/answers/detail/${id}`)
  return result
}

export const getAnswersByUser = async (id) => {
  const result = await get(`api/v1/answers/${id}`)
  return result
}

export const saveAnswer = async (formData) => {
  const result = await post('api/v1/answers/save', formData)
  return result
}
