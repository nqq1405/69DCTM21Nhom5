import * as API from '../../services/clients.services'
import { toggleLoading } from './web.actions'

export const getAllClients = (payload) => ({
  type: "GET_ALL_CLIENTS",
  payload
})

export const getAllClientsAsync = (query) => {
  return dispatch => {
    API.getAllClients(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            getAllClients({
              clients: res.data.clients,
            })
          )
        } else {
          alert('ERROR! ' + res.data.message)
        }
      })
      .catch((err) => {
        alert('ERROR! ' + err)
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }
}

export const createClient = (payload) => ({
  type: 'CREATE_ONE_CLIENTS',
  payload
})

export const createClientAsync = (newClient, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.createClient(newClient)
      .then(res => {
        if (res.data && res.data.status) {
          window.location.reload()
          dispatch(
            createClient(res.data.newClient)
          )
        } else {
          alert('ERROR! ' + res.data.message)
        }
      })
      .catch((err) => {
        alert('ERROR! ' + err)
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }
}
