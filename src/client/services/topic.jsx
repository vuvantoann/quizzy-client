import { get } from '../../utils/request'

export const getListTopic = async () => {
  const result = await get('api/v1/topics')
  return result
}

export const getTopicDetail = async (id) => {
  const result = await get(`api/v1/topics/detail/${id}`)
  return result
}
