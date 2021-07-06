import request from '../utils/request'

export const getAllClients = (query) => {
  const { search } = query || {}
  let url = '/clients'
  if (search) {
    url = url + `search=${search}`
  }

  return request(url, 'GET')
}

export const createClient = (data) => {
  return request('/clients', 'POST', data)
}
