import * as API from '../../services/stories.services'
import { toggleLoading } from './web.actions'

export const getAllCars = (payload) => ({
  type: "GET_ALL_CARS",
  payload
})

export const getAllCarsAsync = (query, loading) => {
  return dispatch => {
    if (loading) dispatch(toggleLoading(true))

    API.getAllCars(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(toggleLoading(false))
          dispatch(
            getAllCars({
              cars: res.data.cars,
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

export const createCar = (payload) => ({
  type: 'CREATE_ONE_CAR',
  payload
})

export const createCarAsync = (newCar, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.createCar(newCar)
      .then(res => {
        if (res.data && res.data.status) {
          if (callback) {
            callback()
          }
          dispatch(
            getAllCarsAsync({}, true)
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

export const updateCar = ({ newCar, index }) => ({
  type: "UPDATE_ONE_CAR",
  payload: { newCar, index }
})

export const updateCarAsync = (_id, newCar, index, callback, loading) => {
  return dispatch => {
    if (!loading)
      dispatch(toggleLoading(true))
    API.updateCar(_id, newCar)
      .then((res) => {
        if (res.data && res.data.status) {
          // dispatch(updateCar({ newCar: res.data.newCar, index }))
          dispatch(getAllCarsAsync({}, false))
          if (callback) {
            callback()
          }
        } else {
          alert('ERROR! ' + res.data.message)
        }
      })
      .catch((err) => {
        alert('ERROR! ' + err)
      })
      .then(() => {
        window.location.reload()
      })
  }
}

export const removeCarAsync = (_id, images) => {
  return (dispatch) => {
    API.deleteCar(_id, images)
      .then((res) => {
        if (res.data && res.data.status) {
          alert('Xóa thành công!')
          dispatch(removeCar(_id))
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

export const removeCar = (payload) => {
  return {
    type: "DELETE_ONE_CAR",
    payload,
  }
}
