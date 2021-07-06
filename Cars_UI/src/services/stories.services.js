import request from '../utils/request'

export const getAllCars = (query) => {
  const { brand, search } = query

  var url = `/cars?`
  if (brand) url = url + `brand=${brand}&`
  if (search) url = url + `search=${search}&`

  return request(url, "GET")
}

export const getOneCar = (_id) => {
  return request(`/cars/${_id}`, 'GET')
}

export const createCar = (data) => {
  return request('/cars', 'POST', data)
}

export const updateCar = (_id, data) => {
  return request(`/cars/${_id}`, 'PUT', data)
}

export const deleteCar = (_id, images) => {
  return request(`/cars/${_id}`, 'DELETE', { images })
}
