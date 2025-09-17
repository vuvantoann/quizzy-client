import { post } from '../../utils/request'

export const login = async (formData) => {
  const result = await post('api/v1/users/login', formData)
  return result
}

// export const editProduct = async (id, formData) => {
//   const result = await patch(`api/v1/admin/tours/edit/${id}`, formData)
//   return result
// }

// export const deleteProduct = async (id) => {
//   const result = del(`api/v1/admin/tours/delete/${id}`)
//   return result
// }
