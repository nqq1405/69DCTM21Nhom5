import request from '../utils/request'

export const getAllBrands = () => {
  return request('/brands', 'GET')
}

export const createBrand = (data) => {
  return request('/brands', 'POST', data)
}

export const updateBrand = (_id, data) => {
  return request(`/brands/${_id}`, 'PUT', data)
}

export const removeBrand = (_id) => {
  return request(`/brands/${_id}`, 'DELETE')
}