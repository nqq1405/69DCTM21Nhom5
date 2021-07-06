
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { getAllClientsAsync } from "../../redux/actions/clients.actions"

const Client = () => {
  const dispatch = useDispatch()
  const { clients } = useSelector(state => state.clients)
  useEffect(() => {
    dispatch({
      type: 'SET_ADMIN_TITLE',
      payload: 'Khách hàng'
    })
  }, [])

  useEffect(() => {
    dispatch(getAllClientsAsync({}))
  }, [])

  return (
    <div id='client'>
      <div id="client-list">
        <div className="client-list-container">
          <h4>Danh sách khách hàng: </h4>
          {(clients && clients.length > 0 && (
            <ul>
              {clients.map((item, key) => (
                <li
                  key={item._id}
                >
                  <p>
                    <strong>Tên: </strong>
                    {item.fullName}
                  </p>
                  <p><strong>Email: </strong>
                    {item.email}
                  </p>
                  <p><strong>Địa chỉ: </strong>
                    {item.address}
                  </p>
                  <p><strong>Số đt: </strong>
                    {item.phone}
                  </p>
                  <p><strong>Lời nhắn: </strong>
                    {item.message}
                  </p>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Client