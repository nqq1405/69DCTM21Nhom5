const initState = {
  cars: [],
}

const carsReducer = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case "GET_ALL_CARS": {
      return {
        ...state,
        cars: payload.cars,
      }
    }

    case "CREATE_ONE_CAR": {
      const { cars } = state

      return {
        ...state,
        cars: [
          ...cars,
          payload
        ]
      }
    }

    case "UPDATE_ONE_CAR": {
      const { cars } = state
      const { newCar, index } = payload
      let newCars = [
        ...cars.slice(0, index),
        newCar,
        ...cars.slice(index + 1)
      ]
      console.log(newCars)

      return {
        ...state,
        cars: newCars
      }
    }

    case "DELETE_ONE_CAR": {
      const { cars } = state
      let newCars = cars.filter(x => x._id !== payload)

      return {
        ...state,
        cars: newCars
      }
    }
  }

  return state

}

export default carsReducer