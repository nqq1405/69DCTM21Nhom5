import { useDispatch, useSelector } from "react-redux"
import Warning from "../../global/Warning"
import { getAllUsersAsync, removeUser, removeUserAsync } from "../../redux/actions/users.actions"

const StaffList = ({ setUpdateForm }) => {
  const { users } = useSelector((state) => state.users)
  const { role, _id } = useSelector((state) => state.users.user)
  console.log(users)
  return (
    <div id="staff-list">
      <div className="staff-list-container">
        <h4>Danh sách người dùng: </h4>
        {(users && users.length > 0 && (
          <ul>
            {users.map((item, key) => (
              <li
                style={{
                  background: _id === item._id && "rgba(40, 44, 253, 0.37)",
                }}
                key={item._id}
              >
                <div className="count">
                  <span>{key + 1}</span>
                </div>
                <div className="info">
                  <div className="avt-wrapper">
                    <img
                      src={
                        (item.image && item.image.url) ||
                        "/images/user_default_img.png"
                      }
                    />
                  </div>
                  <span>{item.fullName}</span>
                </div>
                <div className="detail">
                  <div className="phone">
                    <strong>SĐT: </strong>
                    <span>{item.phone}</span>
                  </div>
                  <div className="email">
                    <strong>Email: </strong>
                    <span>{item.email}</span>
                  </div>
                  {role === "admin" && (
                    <div style={{ color: "red" }} className="account">
                      <strong>Tài khoản: </strong>
                      <span>{item.username}</span>
                      <span> - </span>
                      <span>{item.password}</span>
                    </div>
                  )}
                </div>
                {/* <div className="tools">
                  {(role === "admin" || _id === item._id) && (
                    <button
                      className="edit"
                      onClick={() =>
                        setUpdateForm({ status: true, info: item })
                      }
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  )}
                  {role === "admin" && (
                    <button
                      className="remove"
                      onClick={() => deleteUser(item._id, item.image)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  )}
                </div> */}
              </li>
            ))}
          </ul>
        )) || <Warning alert="Chưa có người dùng!" />}
      </div>
    </div>
  )
}

export default StaffList
