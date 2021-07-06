const initState = {
  clients: []
}

const clientsReducer = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case "GET_ALL_CLIENTS": {
      return {
        ...state,
        clients: payload.clients,
      }
    }

    case "CREATE_ONE_CLIENT": {
      const { clients } = state

      return {
        ...state,
        clients: [
          ...clients,
          payload
        ]
      }
    }
  }

  return state
}

export default clientsReducer