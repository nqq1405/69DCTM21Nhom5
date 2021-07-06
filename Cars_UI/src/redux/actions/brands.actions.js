import * as API from '../../services/categories.services'
import { toggleLoading } from './web.actions'

export const getAllBrands = (payload) => ({
  type: "GET_ALL_BRANDS",
  payload
})

export const getAllBrandsAsync = ({}) => {
  return dispatch => {
    API.getAllBrands({})
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            getAllBrands({
              brands: res.data.brands
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

export const createBrand = (payload) => ({
  type: 'CREATE_ONE_BRAND',
  payload
})

export const createBrandAsync = (newBrand, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.createBrand(newBrand)
      .then(res => {
        if (res.data && res.data.status) {
          if (callback) callback()
          dispatch(
            createBrand(res.data.newBrand)
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

export const updateBrand = (payload) => ({
  type: "UPDATE_ONE_BRAND",
  payload
})

export const updateBrandAsync = (_id, newCategory, index, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.updateBrand(_id, newCategory)
      .then((res) => {
        if (res.data && res.data.status) {
          if (callback) callback()
          dispatch(
            updateBrand({
              newBrand: res.data.newBrand,
              index
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

export const removeBrandAsync = (_id) => {
  return (dispatch) => {
    API.removeBrand(_id)
      .then((res) => {
        if (res.data && res.data.status) {
          alert('Xóa thành công!')
          dispatch(removeBrand(_id))
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

export const removeBrand = (payload) => {
  return {
    type: "DELETE_ONE_BRAND",
    payload,
  }
}