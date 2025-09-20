import { getCookie } from '../helpers/cookie'

const API_DOMAIN = 'http://localhost:3000/'

const withAuthHeader = (headers = {}) => {
  const token = getCookie('token')
  console.log('token', token)
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers
}

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    headers: withAuthHeader(),
  })
  const result = await response.json()
  return result
}

export const post = async (path, data) => {
  const response = await fetch(API_DOMAIN + path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()
  return result
}

export const patch = async (path, data) => {
  const response = await fetch(API_DOMAIN + path, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  return result
}

export const del = async (path) => {
  const response = fetch(API_DOMAIN + path, {
    method: 'DELETE',
    headers: withAuthHeader(),
  })
  const result = (await response).json()
  return result
}
