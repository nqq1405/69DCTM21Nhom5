const initState = {
  brands: [],
  // totalbrands: 0,
  // chapterPage: {}
}

const brandsReducer = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case "GET_ALL_BRANDS": {
      return {
        ...state,
        brands: payload.brands,
      }
    }

    case "CREATE_ONE_BRAND": {
      const { brands } = state

      return {
        ...state,
        brands: [
          ...brands,
          payload
        ]
      }
    }

    case "UPDATE_ONE_BRAND": {
      const { brands } = state
      const { newBrand, index } = payload
      let newBrands = [
        ...brands.slice(0, index),
        newBrand,
        ...brands.slice(index + 1)
      ]

      return {
        ...state,
        brands: newBrands
      }
    }

    case "DELETE_ONE_BRAND": {
      const { brands } = state
      let newBrands = brands.filter(x => x._id !== payload)

      return {
        ...state,
        brands: newBrands
      }
    }
  }

  return state
}

export default brandsReducer