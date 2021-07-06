const initState = {
  adminMenu: [
    {
      title: "Quản lý xe",
      path: "/admin/cars",
      icon: <i className="fas fa-book-reader"></i>,
    },
    {
      title: "Quản lý hãng",
      path: "/admin/brands",
      icon: <i className="fas fa-filter"></i>
    },
    {
      title: "Quản lý khách hàng",
      path: "/admin/clients",
      icon: <i className="fas fa-users"></i>
    },
    {
      title: "Quản lý người dùng",
      path: "/admin/staffs",
      icon: <i className="fas fa-user-tie"></i>
    },
    {
      title: "Đi tới trang chủ",
      path: "/",
      icon: <i className="fas fa-home"></i>
    },
  ],
  loading: false,
  adminTitle: ''
}

const webReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case "TOGGLE_LOADING": {
      return {
        ...state,
        loading: payload
      }
    }

    case "TOGGLE_LOGIN": {
      return {
        ...state,
        login: payload
      }
    }

    case "SET_ADMIN_TITLE": {
      return {
        ...state,
        adminTitle: payload
      }
    }
  }

  return state
}

export default webReducer