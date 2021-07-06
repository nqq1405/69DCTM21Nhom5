const initState = {
  auth: {},
  users: [],
  user: {

  },
  login: false,
}

const usersReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case "GET_ALL_USERS": {
      return {
        ...state,
        users: payload,
      }
    }

    case "CREATE_ONE_USER": {
      const { users } = state

      return {
        ...state,
        users: [
          ...users,
          payload
        ]
      }
    }

    case "UPDATE_ONE_USER": {
      const { users } = state
      const { newUser, index } = payload
      let newUsers = [
        ...users.slice(0, index),
        newUser,
        ...users.slice(index + 1)
      ]

      return {
        ...state,
        users: newUsers
      }
    }

    case "DELETE_ONE_USER": {
      const { users } = state
      let newUsers = users.filter(x => x._id !== payload)

      return {
        ...state,
        users: newUsers
      }
    }

    case "GET_USER_DATA": {
      const {
        login,
        fullName,
        _id,
        role,
        token,
        email,
        username,
        phone,
      } = payload
      localStorage.setItem("accessToken", token)
      localStorage.setItem("role", role)
      localStorage.setItem("login", login)

      return {
        ...state,
        login: login,
        user: {
          _id,
          username,
          fullName,
          role,
          phone,
          email,
        },
      }
    }

    case "AUTHENTICATION": {
      const { login, user } = payload
      const {
        fullName,
        _id,
        role,
        email,
        username,
        phone,
      } = user
      return {
        ...state,
        login: login,
        user: {
          _id,
          username,
          fullName,
          role,
          phone,
          email,
        },
      }
    }

    case "CLEAR_DATA": {
      return {
        ...state,
        login: false,
        user: {
          _id: "",
          username: "",
          fullName: "",
          role: "",
          userImage: null,
          phone: "",
          email: "",
          address: "",
        },
      }
    }
    
  }

  return state
}

export default usersReducer