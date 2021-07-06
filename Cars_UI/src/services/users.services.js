import request from '../utils/request'

export const createUser = (data) => {
  return request('/accounts/register', 'POST', data)
}

export const updateUser = (_id, data) => {
  return request(`/accounts/${_id}`, 'PUT', data)
}

export const getUser = (_id) => {
  return request(`/accounts/${_id}`, 'GET')
}

export const getAllUsers = () => {
  let url = `/accounts`

  return request(url, 'GET')
}

export const deleteUser = (_id, image) => {
  return request(`/accounts/${_id}`, 'DELETE', image)
}