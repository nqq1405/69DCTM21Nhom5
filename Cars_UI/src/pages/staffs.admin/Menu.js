import { useDispatch, useSelector } from "react-redux"
import { getAllUsersAsync } from "../../redux/actions/users.actions"
import toChar from "../../utils/toChar"

const StaffMenu = ({ setCreateForm }) => {
  const dispatch = useDispatch()
  const { role } = useSelector(state => state.users.user)

  const searchStaff = (e) => {
    const value = e.target.value
    dispatch(getAllUsersAsync({ search: toChar(value) }))
  }

  return (
    <div id='staff-menu'>
      <div className='staff-menu-container'>
        <ul>
          {
            role === 'admin' &&
            <li className='add'>
              <button onClick={() => setCreateForm(true)}>
                <i className="fas fa-plus"></i>
                <span>
                  Thêm người dùng
                </span>
              </button>
            </li>
          }
          <li className='name'>
            <input onChange={searchStaff} id='name' placeholder='Tìm kiếm người dùng...' />
            <button className='staff-search'>
              <i className="fas fa-search"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default StaffMenu