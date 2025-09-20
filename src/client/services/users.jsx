import { get, post } from '../../utils/request'

export const login = async (formData) => {
  const result = await post('api/v1/users/login', formData)
  return result
}

export const register = async (formData) => {
  const result = await post(`api/v1/users/register`, formData)
  return result
}

export const getUserDetail = async () => {
  const result = get(`api/v1/users/detail`)
  return result
}
